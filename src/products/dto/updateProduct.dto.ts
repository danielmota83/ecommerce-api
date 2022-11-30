import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './createProduct.dto';

export class UpdateGameDto extends PartialType(CreateProductDto) {}
