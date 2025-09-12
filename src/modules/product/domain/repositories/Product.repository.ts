import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

import { Product } from '../entities/Product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract save(product: Product): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract findById(productId: string): Promise<Product | null>;
  abstract findLastByPrefix(code: string): Promise<Product | null>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Product>>;
}
