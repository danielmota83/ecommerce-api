import { ApiProperty } from '@nestjs/swagger';

export class CreateCartOrderDto {
  @ApiProperty({
    description: 'valor do frete',
    example: 15,
  })
  shipping: number;

  @ApiProperty({
    description: 'Valor total da compra',
    example: 315,
  })
  totalPrice: number;
}
