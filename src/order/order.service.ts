import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Order> {
    const record = await this.prisma.order.findUnique({
      where: { id },
      include: {
        product: {
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

  create(userId: any) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },

      orderDetails: '',
      cart: {
        create: undefined,
        connectOrCreate: {
          where: {
            id: '',
          },
          create: undefined,
        },
        connect: {
          id: '',
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
          product: {
            select: {
              id: true,
              title: true,
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
  async delete(id: string) {
    try {
      await this.findById(id);

      await this.prisma.order
        .delete({
          where: { id },
        })
        .catch(this.handleError);
    } catch {
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
