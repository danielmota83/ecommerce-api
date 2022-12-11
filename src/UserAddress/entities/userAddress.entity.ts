import { User } from 'src/user/entities/user.entity';

export enum AddressType {
  residential,
  commercial,
  relatives,
  neighbors,
  other,
}
export class UserAddress {
  id?: string;
  addressType: string;
  addressInfo: AddressType;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
