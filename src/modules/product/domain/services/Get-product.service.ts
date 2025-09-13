import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/Product.repository';

interface GetProductRequest {
  productId: string;
}
interface GetProductResponse {
  product: Product;
}
@Injectable()
export class GetProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ productId }: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException();
    return { product };
  }
}
