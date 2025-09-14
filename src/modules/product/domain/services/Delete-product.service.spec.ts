import { ProductNotFoundException } from '@modules/product/exceptions/product-not-found.exception';
import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { DeleteProductService } from './delete-product.service';

let inMemoryProductRepository: InMemoryProductRepository;
let deleteProductService: DeleteProductService;

describe('Delete a  Product ', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    deleteProductService = new DeleteProductService(inMemoryProductRepository);
  });
  it('should be able to throw error when not found product', async () => {
    const product = makeProduct();
    inMemoryProductRepository.products = [product];

    expect(async () => {
      await deleteProductService.execute({ productId: 'fake-id' });
    }).rejects.toThrowError(ProductNotFoundException);
  });

  it('should be able to delete product', async () => {
    const product = makeProduct();
    inMemoryProductRepository.products = [product];

    await deleteProductService.execute({ productId: product.id });

    expect(inMemoryProductRepository.products).toHaveLength(0);
  });
});
