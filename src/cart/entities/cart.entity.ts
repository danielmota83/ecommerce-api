import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { UserAddress } from 'src/UserAddress/entities/userAddress.entity';
import { Payment } from 'src/payment/entities/payment.entity';
export class Cart {
  id?: string;
  user?: User;
  order?: Order[];
  payment?: Payment;
  userAddress?: UserAddress[];
  shipping: number;
  totalPrice: number;
}
