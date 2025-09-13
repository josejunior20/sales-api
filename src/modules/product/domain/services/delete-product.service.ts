import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/Product.repository';
interface DeleteProductRequest {
  productId: string;
}

@Injectable()
export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ productId }: DeleteProductRequest): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException();

    await this.productRepository.delete(product.id);
  }
}
