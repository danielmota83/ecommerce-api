import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserAddressService } from './userAddress.service';
import { CreateUserAddressDto } from './dto/createUserAddress.dto';
import { UpdateUserAddressDto } from './dto/updateUserAddress.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
@ApiTags('userAddress')
@UseGuards(AuthGuard())
@ApiBearerAuth('JWT')
@Controller('userAddress')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo enedereço de enrega do usuário',
  })
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os endereços cadastrados do usuário',
  })
  findAll(@LoggedUser() user: User) {
    return this.userAddressService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um endereço do usuário',
  })
  findOne(@Param('id') id: string) {
    return this.userAddressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar endereço do usuário',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.update(id, updateUserAddressDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar endereço de entrega do usuário',
  })
  delete(@Param('id') id: string) {
    return this.userAddressService.delete(id);
  }
}
