import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Cart> {
    const record = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            orderDetails: true,
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

  create(orderId: string, createCartDto: CreateCartDto) {
    const data: Prisma.CartCreateInput = {
      order: {
        connect: {
          id: orderId,
        },
      },
      shipping: createCartDto.shipping,
      totalPrice: createCartDto.totalPrice,
      orderDetails: '',
    };

    try {
      return this.prisma.cart.create({
        data,
        select: {
          id: true,
          order: {
            select: {
              orderDetails: true,
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

  update(id: string, updateCartDto: UpdateCartDto) {
    const data: Prisma.CartUpdateInput = {
      shipping: updateCartDto.shipping,
      totalPrice: updateCartDto.totalPrice,
      order: {
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
