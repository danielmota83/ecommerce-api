import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UserService {
  private userSelect = {
    id: false,
    name: true,
    email: true,
    password: false,
    cpf: false,
    isAdmin: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  findAll(user: User): Promise<User[]> {
    if (user.isAdmin) {
      return this.prisma.user.findMany();
    } else {
      throw new UnauthorizedException('Acesso apenas para administradores');
    }
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        password: true,
        isAdmin: true,
      },
    });

    if (!record) {
      throw new NotFoundException("Registro com o Id '${id}' não encontrado.");
    }

    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (!cpf.isValid(dto.cpf)) {
      throw new BadRequestException('CPF não é valido');
    }

    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      cpf: cpf.format(dto.cpf),
    };

    return this.prisma.user.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (dto.cpf) {
      if (!cpf.isValid(dto.cpf)) {
        throw new BadRequestException('CPF não é valido');
      }
    }

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.cpf) {
      data.cpf = cpf.format(data.cpf);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.user
      .delete({
        where: { id },
      })
      .catch(this.handleError);
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
