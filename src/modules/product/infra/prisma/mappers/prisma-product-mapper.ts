import { Product } from '@modules/product/domain/entities/Product';
import { Product as RawProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
    };
  }

  static toDomain(raw: RawProduct): Product {
    return new Product({
      id: raw.id,
      code: raw.code,
      name: raw.name,
      description: raw.description,
      price: Number(raw.price),
      quantity: raw.quantity,
      category: raw.category,
      image: raw.image,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
