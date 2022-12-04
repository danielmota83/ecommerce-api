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
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    if (loggedUser) {
      const data: Prisma.ordersCreateInput = {
        orderDetails: createOrderDto.orderDetails,
      };

      return this.prisma.orders.create({ data }).catch(this.handleError);
    } else {
      throw new UnauthorizedException('Usuário não está logado');
    }
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
    user: User,
  ): Promise<Order> {
    await this.findById(id);

    const data: Prisma.OrdersUpdateInput = {
      name: updateOrderDto.name,
    };

    return this.prisma.Orders.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, user: User) {
    await this.findById(id);

    await this.prisma.Orders.delete({
      where: { id },
    }).catch(this.handleError);
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
