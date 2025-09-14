import { Injectable } from '@nestjs/common';

import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/Product.repository';
interface GetAllProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
@Injectable()
export class GetAllProductService {
  constructor(private productRepository: ProductRepository) {}
  async execute(page = 1, limit = 10): Promise<GetAllProductResponse> {
    const products = await this.productRepository.findAll(page, limit);
    return { products: products.data, ...products };
  }
}
