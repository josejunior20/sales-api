import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

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
      inMemoryProductRepository.products.push(makeProduct());
    }

    const response = await getAllProductService.execute();
    expect(response.products).toHaveLength(3);
    expect(response.total).toBe(3);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.lastPage).toBe(1);
  });

  it('Should return an empty array if no products are found', async () => {
    const response = await getAllProductService.execute();
    expect(response.products).toHaveLength(0);
    expect(response.total).toBe(0);
    expect(response.page).toBe(1);
  });

  it('Should return only the first page of products', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryProductRepository.products.push(makeProduct());
    }

    const response = await getAllProductService.execute(1, 2);
    expect(response.products).toHaveLength(2);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(2);
    expect(response.total).toBe(6);
    expect(response.lastPage).toBe(3);
  });

  it('Should return the second page of products', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryProductRepository.products.push(makeProduct());
    }

    const response = await getAllProductService.execute(2, 2);
    expect(response.products).toHaveLength(2);
    expect(response.page).toBe(2);
    expect(response.limit).toBe(2);
    expect(response.total).toBe(6);
    expect(response.lastPage).toBe(3);
  });

  it('Should return the last page of products', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryProductRepository.products.push(makeProduct());
    }

    const response = await getAllProductService.execute(3, 2);
    expect(response.products).toHaveLength(2);
    expect(response.page).toBe(3);
    expect(response.limit).toBe(2);
    expect(response.total).toBe(6);
    expect(response.lastPage).toBe(3);
  });
});
