import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';
import exp from 'constants';

import { GetAllProductService } from './Get-all-product.service';

let inMemoryProductRepository: InMemoryProductRepository;
let getAllProductService: GetAllProductService;

describe('Get all Products', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    getAllProductService = new GetAllProductService(inMemoryProductRepository);
  });

  it('Should be able to get all products', async () => {
    for (let i = 0; i < 3; i++) {
      await inMemoryProductRepository.products.push(makeProduct());
    }

    const response = await getAllProductService.execute();
    expect(response.products).toHaveLength(3);
    expect(response.total).toBe(3);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.lastPage).toBe(1);
  });
});
