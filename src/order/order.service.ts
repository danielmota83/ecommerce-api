import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Order[]> {
    return this.prisma.orders.findMany({
      include: {
        productsOrder: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Order> {
    const record = await this.prisma.orders.findUnique({
      where: { id },
      include: {
        productOrder: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Order> {
    return this.findById(id);
  }

  create(userId: string, createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      products: {
        createMany: {
          data: createOrderDto.products.map((createOrderProductDto) => ({
            productId: createOrderProductDto.productId,
            orderDetails: createOrderProductDto.orderDetails,
          })),
        },
      },
    };

    try {
      return this.prisma.order.create({
        data,
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              quantity: true,
              description: true,
              product: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      return this.handleError;
    }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    const data: Prisma.OrderUpdateInput = {
      orderDetails: updateOrderDto.orderDetails,
      user: {
        connect: {
          id: updateOrderDto.productId,
        },
      },
    };

    return this.prisma.order.update({
      where: { id },
      data,
    });
  }
  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);

      await this.prisma.orders
        .delete({
          where: { id },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
