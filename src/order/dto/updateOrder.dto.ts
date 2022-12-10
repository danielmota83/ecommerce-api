import { PartialType } from '@nestjs/swagger';
import { CreateOrderProductDto } from './createOrderProduct.dto';

export class UpdateOrderDto extends PartialType(CreateOrderProductDto) {}
