import { PartialType } from '@nestjs/swagger';
import { CreateUserAddressDto } from './createUserAddress.dto';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
