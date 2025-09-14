import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { Product } from '../entities/Product';
import { DecreaseProductQuantityService } from './Decrease-product-quantity.service';

describe('Decrease Product Quantity', () => {
  let inMemoryProductRepository: InMemoryProductRepository;
  let decreaseProductQuantityService: DecreaseProductQuantityService;
  let product: Product;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    decreaseProductQuantityService = new DecreaseProductQuantityService(
      inMemoryProductRepository,
    );
    for (let i = 0; i <= 10; i++) {
      product = makeProduct();
      inMemoryProductRepository.products = [product];
    }
  });
  it('should be able to decrease product quantity', async () => {
    product.decreaseQuantity(5);
    expect(product.quantity).toBe(5);
  });

  it('should not be able to decrease product quantity if product is not found', async () => {
    expect(async () => {
      await decreaseProductQuantityService.execute({
        productId: 'invalid-id',
        quantitySold: 5,
      });
    }).rejects.toBeInstanceOf(ProductNotFoundException);
  });
});
