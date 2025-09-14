import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/Product.repository';

interface IncreaseProductQuantityRequest {
  productId: string;
  quantityPushed: number;
}

interface IncreaseProductQuantityResponse {
  product: Product;
}
@Injectable()
export class IncreaseProductQuantityService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
    quantityPushed,
  }: IncreaseProductQuantityRequest): Promise<IncreaseProductQuantityResponse> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException();

    product.increaseQuantity(quantityPushed);

    await this.productRepository.save(product);
    return { product };
  }
}
