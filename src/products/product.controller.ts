/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Mostrar catalogo de jogos'
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Procurar por Jogo'
  })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar Jogo'
  })
  create(@LoggedUser() user: User, @Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar/modificar um Jogo por Id'
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um Jogo'
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.productsService.delete(id, user);
  }
}