import { Product } from '@modules/product/domain/entities/Product';
import { ProductRepository } from '@modules/product/domain/repositories/Product.repository';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];
  async create(product: Product): Promise<void> {
    this.products.push(product);
  }
  async save(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
  }
  async delete(productId: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== productId);
  }
  async findById(productId: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === productId);
    return product ?? null;
  }
  findLastByPrefix(code: string): Promise<Product | null> {
    const filtered = this.products
      .filter(p => p.code.startsWith(code))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return Promise.resolve(filtered.length > 0 ? filtered[0] : null);
  }
  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Product>> {
    const total = this.products.length;
    const lastPage = total === 0 ? 1 : Math.ceil(total / limit);
    const data = this.products.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, lastPage };
  }
}
