import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Usuário',
    example: 'Daniel',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'daniel@daniel.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    //REGEX para senha ter letra maíscula, minúscula e número.
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha de acesso do usuário',
    example: 'Dani*123',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'As senhas devem ser iguais',
    example: 'Dani*123',
  })
  confirmPassword: string;

  @IsString()
  @MaxLength(15)
  @ApiProperty({
    description: 'CPF do usuário',
    example: '79627815217',
  })
  cpf: string;

  isAdmin: boolean;
}
