import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { Product } from '../entities/Product';
import { IncreaseProductQuantityService } from './Increase-product-quantity.service';

describe('Increase Product Quantity', () => {
  let inMemoryProductRepository: InMemoryProductRepository;
  let increaseProductQuantityService: IncreaseProductQuantityService;
  let product: Product;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    increaseProductQuantityService = new IncreaseProductQuantityService(
      inMemoryProductRepository,
    );
    for (let i = 0; i <= 10; i++) {
      product = makeProduct();
      inMemoryProductRepository.products = [product];
    }
  });
  it('should be able to increase product quantity', async () => {
    product.increaseQuantity(25);
    expect(product.quantity).toBe(35);
  });

  it('should not be able to increase product quantity if product is not found', async () => {
    expect(async () => {
      await increaseProductQuantityService.execute({
        productId: 'invalid-id',
        quantityPushed: 5,
      });
    }).rejects.toBeInstanceOf(ProductNotFoundException);
  });
});
