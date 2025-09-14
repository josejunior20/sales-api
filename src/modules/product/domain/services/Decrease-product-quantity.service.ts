import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { Injectable } from '@nestjs/common';

import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/Product.repository';

interface DecreaseProductQuantityRequest {
  productId: string;
  quantitySold: number;
}

interface DecreaseProductQuantityResponse {
  product: Product;
}
@Injectable()
export class DecreaseProductQuantityService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
    quantitySold,
  }: DecreaseProductQuantityRequest): Promise<DecreaseProductQuantityResponse> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException();

    product.decreaseQuantity(quantitySold);

    await this.productRepository.save(product);
    return { product };
  }
}
