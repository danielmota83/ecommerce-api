import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private userSelect = {
    id: false,
    name: true,
    nickname: true,
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
      throw new UnauthorizedException(
        'Apenas Administradores tem permissão de visualizar as informações de outros usuários!',
      );
    }
  }
  async findById(id: string): Promise<User> {
    const found = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        cpf: true,
        password: true,
        isAdmin: true,
        profiles: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!found) {
      throw new NotFoundException("O Id '${id}' não foi encontrado.");
    }

    return found;
  }
}
