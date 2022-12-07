import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @ApiProperty({
    description: 'Tipo de pagamento',
    example: 'Boleto bancário',
  })
  paymentType: string;

  @ApiProperty({
    description: 'Pagamento realizado?',
    example: 'false',
  })
  status: boolean;

  @IsUUID()
  @ApiProperty({
    description: 'Id do carrinho',
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936',
  })
  cartId: string;
}
