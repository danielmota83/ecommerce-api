import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @ApiProperty({
    description: 'Destalhes do prodto selecionado',
    example: 'speakers de som da marca JBL',
  })
  orderDetails: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do produto a ser adicionado na ordem',
    example: '6e6c4e46-37dd-4bfc-8abc-495e8b151b40',
  })
  productId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936',
  })
  userId: string;
}
