import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserAddressDto } from './dto/createUserAddress.dto';
import { UpdateUserAddressDto } from './dto/updateUserAddress.dto';
import { UserAddress } from './entities/userAddress.entity';
@Injectable()
export class UserAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    const data: Prisma.UserAddressCreateInput = {
      user: {
        connect: {
          id: createUserAddressDto.userId,
        },
      },
      addressType: createUserAddressDto.addressType,
      addressInfo: createUserAddressDto.addressInfo,
    };
    try {
      return await this.prisma.userAddress.create({
        data,
        select: {
          id: true,
          addressType: true,
          addressInfo: true,
          user: true,
        },
      });
    } catch (error) {
      return this.handleError;
    }
  }

  findAll(user: User) {
    return this.prisma.userAddress.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async findById(id: string): Promise<UserAddress> {
    const record = await this.prisma.userAddress.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    const data: Prisma.UserAddressUpdateInput = {
      addressType: updateUserAddressDto.addressType,
      addressInfo: updateUserAddressDto.addressInfo,
      user: {
        connect: {
          id: updateUserAddressDto.userId,
        },
      },
    };

    return this.prisma.userAddress.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.userAddress.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
