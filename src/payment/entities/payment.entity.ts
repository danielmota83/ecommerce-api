import { Cart } from 'src/cart/entities/cart.entity';

export enum PaymentType {
  creditCard,
  invoice,
  directTransfer,
}
export class Payment {
  id?: string;
  paymentType: PaymentType;
  cart?: Cart;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
