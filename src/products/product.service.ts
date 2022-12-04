import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.products.findMany({});
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.products.findUnique({
      where: { id },
      include: {},
    });

    if (!record) {
      throw new NotFoundException("Produto com o Id '${id}' não encontrado.");
    }

    return record;
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    if (user.isAdmin) {
      const data: Prisma.ProductsCreateInput = {
        title: createProductDto.title,
        coverImageUrl: createProductDto.coverImageUrl,
        price: createProductDto.price,
        description: createProductDto.description,
        customerScore: createProductDto.customerScore,
        quantity: createProductDto.quantity,
      };

      return await this.prisma.product
        .create({
          data,
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    if (user.isAdmin) {
      const data: Prisma.ProductsUpdateInput = {
        title: updateProductDto.title,
        coverImageUrl: updateProductDto.coverImageUrl,
        description: updateProductDto.description,
        price: updateProductDto.price,
        customerScore: updateProductDto.customerScore,
        quantity: updateProductDto.quantity,
      };

      return this.prisma.product.update({
        where: { id },
        data,
      });
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
  }

  async delete(id: string, user: User) {
    if (user.isAdmin) {
      await this.findById(id);

      await this.prisma.product
        .delete({
          where: { id },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Contate o Administrador!',
      );
    }
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
