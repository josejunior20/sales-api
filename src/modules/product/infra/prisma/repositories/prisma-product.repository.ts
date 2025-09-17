import { Product } from '@modules/product/domain/entities/Product';
import { ProductRepository } from '@modules/product/domain/repositories/Product.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma-service';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.create({
      data: raw,
    });
  }
  async save(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);
    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: raw,
    });
  }
  async delete(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
  async findById(productId: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) return null;

    return PrismaProductMapper.toDomain(product);
  }
  async findLastByPrefix(code: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        code: {
          startsWith: code,
        },
      },
      orderBy: {
        code: 'desc',
      },
    });
    if (!product) return null;

    return PrismaProductMapper.toDomain(product);
  }
  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Product>> {
    const [rawProducts, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count(),
    ]);
    const products = rawProducts.map(raw => PrismaProductMapper.toDomain(raw));
    return {
      data: products,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }
}
