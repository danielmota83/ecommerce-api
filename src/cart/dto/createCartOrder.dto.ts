import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

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

  @IsUUID()
  @ApiProperty({
    description: 'Id do pedido',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40',
  })
  orderId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do tipo de endereço selecionado',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40',
  })
  userAdressId: string;
}
