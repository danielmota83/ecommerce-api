import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { CreateCartOrderDto } from './createCartOrder.dto';

export class CreateCartDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateCartOrderDto)
  @ApiProperty({
    description: 'Id da ordem de compra',
    type: [CreateCartOrderDto],
  })
  orders: CreateCartOrderDto[];

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936',
  })
  userId: string;

  @Type(() => CreateCartOrderDto)
  @ApiProperty({
    description: 'Id do tipo de endereço selecionado',
    type: [CreateCartOrderDto],
  })
  useAdress: CreateCartOrderDto[];
}
