import { Product } from '@modules/product/domain/entities/Product';
import { ProductRepository } from '@modules/product/domain/repositories/Product.repository';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];
  async create(product: Product): Promise<void> {
    this.products.push(product);
  }
  async save(product: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(productId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }
  findLastByPrefix(code: string): Promise<Product | null> {
    const filtered = this.products
      .filter(p => p.code.startsWith(code))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return Promise.resolve(filtered.length > 0 ? filtered[0] : null);
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}
