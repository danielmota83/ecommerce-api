import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { UserAddress } from 'src/UserAddress/entities/userAddress.entity';

export class Cart {
  id?: string;
  user?: User;
  order?: Order[];
  userAddress?: UserAddress;
  shipping: number;
  totalprice: number;
}
