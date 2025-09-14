import { Injectable } from '@nestjs/common';

import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/Product.repository';

export interface CreateProductServiceRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string[];
}

export interface CreateProductServiceResponse {
  product: Product;
}
@Injectable()
export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  private readonly productPrefixes: Record<string, string> = {
    televisao: 'TVS',
    computador: 'CMP',
  };
  private getPrefix(code: string): string {
    const prefix = code
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase();

    return this.productPrefixes[prefix] ?? prefix.substring(0, 3).toUpperCase();
  }

  async execute({
    name,
    description,
    price,
    quantity,
    category,
    image,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const prefix = this.getPrefix(name);

    const lastProduct = await this.productRepository.findLastByPrefix(prefix);

    let nextNumber = 1;
    if (lastProduct) {
      const lastCode = lastProduct.code.split('-')[1];
      nextNumber = parseInt(lastCode, 10) + 1;
    }

    const code = `${prefix}-${String(nextNumber).padStart(4, '0')}`;

    const product = new Product({
      code,
      name,
      description,
      price,
      quantity,
      category,
      image,
    });

    await this.productRepository.create(product);

    return { product };
  }
}
