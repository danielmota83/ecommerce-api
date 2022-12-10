import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Cart> {
    const record = await this.prisma.carts.findUnique({
      where: { id },
      include: {
        productCart: {
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

  findOne(id: string): Promise<Cart> {
    return this.findById(id);
  }

  create(userId: string, createCartDto: CreateCartDto) {
    const data: Prisma.CartCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      orders: {
        createMany: {
          data: createCartDto.orders.map((createCartOrderDto) => ({
            shipping: createCartOrderDto.shipping,
            totalPrice: createCartOrderDto.totalPrice,
          })),
        },
      },
    };

    try {
      return this.prisma.cart.create({
        data,
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          orders: {
            select: {
              oderDetails: true,
              product: {
                select: {
                  title: true,
                },
                userAddress: {
                  select: {
                    adressInfo: true,
                  },
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

  update(id: string, updateCartDto: UpdateCartDto) {
    const data: Prisma.CartUpdateInput = {
      shipping: updateCartDto.shipping,
      totalPrice: updateCartDto.totalPrice,
      user: {
        connect: {
          id: updateCartDto.orderId,
        },
      },
    };

    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    try {
      await this.findById(id);
      return this.prisma.cart.delete({ where: { id } });
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
