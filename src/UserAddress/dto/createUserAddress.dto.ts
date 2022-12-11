import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { AddressType } from '../entities/userAddress.entity';

export class CreateUserAddressDto {
  @IsEnum(AddressType)
  @ApiProperty({
    description: 'Tipo do endereço cadastrado',
    example: 'Endereço residencial',
  })
  addressType: AddressType;

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
