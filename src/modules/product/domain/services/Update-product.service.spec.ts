import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { Product } from '../entities/Product';
import { UpdateProductService } from './Update-product.service';

describe('Update product  service', () => {
  let inMemoryProductRepository: InMemoryProductRepository;
  let updateProductService: UpdateProductService;
  let product: Product;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    updateProductService = new UpdateProductService(inMemoryProductRepository);

    for (let i = 0; i <= 10; i++) {
      product = makeProduct();
      inMemoryProductRepository.products = [product];
    }
  });

  it('should be able to update a product', () => {
    product.updateProfile({
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      quantity: 20,
      category: 'Category 2',
      image: ['Image 2'],
    });

    return updateProductService.execute({
      productId: product.id,
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      category: 'Category 2',
      image: ['Image 2'],
    });
  });

  it('should not be able to update a product that does not exist', () => {
    return expect(
      updateProductService.execute({
        productId: 'product-not-found',
        name: 'Product 2',
        description: 'Description 2',
        price: 20,
        category: 'Category 2',
        image: ['Image 2'],
      }),
    ).rejects.toBeInstanceOf(ProductNotFoundException);
  });
});
