import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Nome produto',
    example: 'Speaker',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do produto',
    example: 'https://imgs.ponto.com.br/55004527/1xg.jpg',
  })
  imageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Speaker potente e com bom grave',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Preço do produto',
    example: 'R$300,00',
  })
  price: string;

  @ApiProperty({
    description: 'Pontuação do produto',
    example: 4,
  })
  customerScore: number;

  @ApiProperty({
    description: 'Quantidade de itens do produto selecionado',
    example: 2,
  })
  quantity: number;
}
