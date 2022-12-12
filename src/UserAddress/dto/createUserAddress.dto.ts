import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateUserAddressDto {
  @IsString()
  @ApiProperty({
    description: 'Tipo do endereço cadastrado',
    example: 'Endereço residencial',
  })
  addressType: string;

  @IsString()
  @ApiProperty({
    description: 'Endereço completo',
    example: 'Rua Api, 222 Bairro: Go Code, BH - Minas Gerais  ',
  })
  addressInfo: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário',
    example: 'e9fa4fb9-8482-44d3-a4b5-1f82b1552936',
  })
  userId: string;
}
