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

  @Type(() => CreateCartOrderDto)
  @ApiProperty({
    description: 'Id do tipo de endereço selecionado',
    type: [CreateCartOrderDto],
  })
  useAdress: CreateCartOrderDto[];
}
