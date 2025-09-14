import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { GetProductService } from './Get-product.service';

let inMemoryProductRepository: InMemoryProductRepository;
let getProductService: GetProductService;

describe('Get product by Id ', () => {
  beforeEach(async () => {
    inMemoryProductRepository = new InMemoryProductRepository();
    getProductService = new GetProductService(inMemoryProductRepository);
  });

  it('should be able to get a product', async () => {
    const product = makeProduct();
    inMemoryProductRepository.products = [product];

    await getProductService.execute({ productId: product.id });
    expect(inMemoryProductRepository.products[0]).toEqual(product);
  });

  it('should be able throw error when not found product ', () => {
    const product = makeProduct();
    inMemoryProductRepository.products = [product];

    expect(async () => {
      await getProductService.execute({ productId: 'fake-id' });
    }).rejects.toThrowError(ProductNotFoundException);
  });
});
