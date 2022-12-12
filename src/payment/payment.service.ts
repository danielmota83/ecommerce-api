import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment.findMany();
  }

  async findById(id: string): Promise<Payment> {
    const record = await this.prisma.payment.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Payment> {
    return this.findById(id);
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const data: Prisma.PaymentCreateInput = {
      cart: {
        connect: {
          id: createPaymentDto.cartId,
        },
      },
      status: createPaymentDto.status,
      paymentType: createPaymentDto.paymentType,
    };
    try {
      return await this.prisma.payment.create({
        data,
        select: {
          id: true,
          status: true,
          cart: true,
        },
      });
    } catch (error) {
      return this.handleError;
    }
  }
  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    try {
      const data: Prisma.PaymentUpdateInput = {
        status: updatePaymentDto.status,
        paymentType: updatePaymentDto.paymentType,
      };

      return this.prisma.payment.update({
        where: { id },
        data,
      });
    } catch {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.payment.delete({ where: { id } });
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
