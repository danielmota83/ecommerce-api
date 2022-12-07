import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class Order {
  id?: string;
  orderDetails: string;
  user?: User;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
