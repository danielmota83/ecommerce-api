import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os pagamentos ',
  })
  findAll(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um pagamento',
  })
  findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um pagamento',
  })
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<any> {
    return this.paymentService.create(createPaymentDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um pagamento',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um pagamento pelo ID',
  })
  delete(@Param('id') id: string) {
    this.paymentService.delete(id);
  }
}
