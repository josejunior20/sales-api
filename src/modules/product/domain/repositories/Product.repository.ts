import { Product } from '../entities/Product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract save(product: Product): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findLastByPrefix(code: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
}
