import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateCartDto } from './dto/createCart.dto';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/updateCart.dto';
import { Cart } from './entities/cart.entity';

@ApiTags('cart')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar carrinho para compra dos pedidos',
  })
  create(@LoggedUser() user: User, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(user.id, createCartDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar carrinho de compras pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar carrinho de compras',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar carrinho de compras',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.cartService.delete(id);
  }
}
