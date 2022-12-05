import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';

export class UserAddress {
  id?: string;
  addressType: string;
  addressInfo: string;
  user?: User;
  cart?: Cart;
  createdAt?: Date;
  updatedAt?: Date;
}
