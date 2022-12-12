import { Cart } from 'src/cart/entities/cart.entity';

export enum PaymentType {
  creditCard,
  invoice,
  directTransfer,
}
export class Payment {
  id?: string;
  paymentType: string;
  cart?: Cart;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
