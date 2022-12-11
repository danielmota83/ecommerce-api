import { Order } from 'src/order/entities/order.entity';
import { UserAddress } from 'src/UserAddress/entities/userAddress.entity';
export class Cart {
  id?: string;
  order?: Order[];
  userAddress?: UserAddress[];
  shipping: number;
  totalPrice: number;
}
