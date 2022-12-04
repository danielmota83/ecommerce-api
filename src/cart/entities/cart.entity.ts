import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { userAddress } from 'src/UserAddress/userAddress.entity';

export class Cart {
  id?: string;
  user?: User;
  order?: Order[];
  userAddress?: userAddress;
  shipping: number;
  totalprice: number;
}
