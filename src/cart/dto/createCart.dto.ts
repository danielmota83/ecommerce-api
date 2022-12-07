import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'Preço do frete',
    example: 'R$15,00',
  })
  shipping: number;

  @ApiProperty({
    description: 'Preço total frete + produto',
    example: 'R$315,00',
  })
  totalPrice: number;

  @IsUUID()
  @ApiProperty({
    description: 'Id do produto a ser adicionado na ordem',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40',
  })
  productId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id da ordem de compra',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40',
  })
  orderId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936',
  })
  userId: string;
}
