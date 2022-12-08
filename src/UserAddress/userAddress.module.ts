import { Module } from '@nestjs/common';
import { UserAddressService } from './userAddress.service';
import { UserAddressController } from './userAddress.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
