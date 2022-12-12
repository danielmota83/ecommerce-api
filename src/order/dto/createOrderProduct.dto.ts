import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  @ApiProperty({
    description: 'Destalhes do prodto selecionado',
    example: 'speakers de som da marca JBL',
  })
  orderDetails: string;
}
