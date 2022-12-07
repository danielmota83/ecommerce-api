import { User } from 'src/user/entities/user.entity';

export class UserAddress {
  id?: string;
  addressType: string;
  addressInfo: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
