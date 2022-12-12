import { PartialType } from '@nestjs/swagger';
import { CreateCartOrderDto } from './createCartOrder.dto';

export class UpdateCartDto extends PartialType(CreateCartOrderDto) {
  orderId: any;
}
