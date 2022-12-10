import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateCartDto } from './dto/createCart.dto';
import { CartService } from './cart.service';

@ApiTags('cart')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um pedido',
  })
  create(@LoggedUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(user.id, createCartDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os pedidos',
  })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um pedido pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }
}