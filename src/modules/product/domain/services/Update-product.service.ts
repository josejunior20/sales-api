import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { Injectable } from '@nestjs/common';

import { ProductRepository } from '../repositories/Product.repository';
import { Product } from './../entities/Product';

interface UpdateProductRequest {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string[];
}

interface UpdateProductResponse {
  product: Product;
}
@Injectable()
export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    productId,
    category,
    description,
    image,
    name,
    price,
  }: UpdateProductRequest): Promise<UpdateProductResponse> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new ProductNotFoundException();

    product.updateProfile({
      category,
      description,
      image,
      name,
      price,
    });

    await this.productRepository.save(product);
    return { product };
  }
}
