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
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Speaker potente e com bom grave',
  })
  description: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 'R$300,00',
  })
  price: string;

  @ApiProperty({
    description: 'Pontuação do produto',
    example: 4,
  })
  cutumerScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer review do produto',
    example: 'https://www.youtube.com/watch?v=eaW0tYpxyp0',
  })
  trailerYoutubeUrl: string;
}
