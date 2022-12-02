import { Product } from 'src/products/entities/product.entity';

export class Order {
  id: string;
  orderDetails: string;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
