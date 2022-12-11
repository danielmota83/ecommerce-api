import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Payment[]> {
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

  create(dto: CreatePaymentDto): Promise<Payment> {
    const data: Payment = {
      ...dto,
      createdAt: undefined,
      updatedAt: undefined,
    };

    return this.prisma.payment.create({ data }).catch(handleError);
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    await this.findById(id);

    const data: Partial<Payment> = { ...dto };

    return this.prisma.payment
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.payment.delete({ where: { id } });
  }
}
