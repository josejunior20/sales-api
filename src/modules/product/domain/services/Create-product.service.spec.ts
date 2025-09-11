import { makeProduct } from '@test/Product/product.factory';
import { InMemoryProductRepository } from '@test/Product/repositories/in-memory-product.repository';

import { CreateProductService } from './Create-product.service';

describe('CreateProductService', () => {
  let createProductService: CreateProductService;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    createProductService = new CreateProductService(inMemoryProductRepository);
  });

  it('Should create a product with code starting at 0001', async () => {
    const { product } = await createProductService.execute({
      name: 'Celular',
      description: 'Celular top de linha',
      price: 1500,
      quantity: 10,
      category: 'Eletrônicos',
      image: ['celular.png'],
    });

    expect(product.code).toBe('CEL-0001');
    expect(inMemoryProductRepository.products).toHaveLength(1);
  });

  it('Should increment product code if prefix already exists', async () => {
    const existingProduct = makeProduct({ code: 'CEL-0001' });
    inMemoryProductRepository.products.push(existingProduct);

    const { product } = await createProductService.execute({
      name: 'Celular',
      description: 'Outro celular',
      price: 2000,
      quantity: 3,
      category: 'Eletrônicos',
      image: ['cel2.png'],
    });

    expect(product.code).toBe('CEL-0002');
    expect(inMemoryProductRepository.products).toHaveLength(2);
  });

  it('Should use custom abbreviation if it exists (TVS for Televisão)', async () => {
    const { product } = await createProductService.execute({
      name: 'Televisão',
      description: 'Smart TV 4K',
      price: 3000,
      quantity: 2,
      category: 'Eletrônicos',
      image: ['tv.png'],
    });

    expect(product.code).toBe('TVS-0001');
  });

  it('Should fallback to first 3 letters if abbreviation does not exist', async () => {
    const { product } = await createProductService.execute({
      name: 'Notebook',
      description: 'Notebook gamer',
      price: 5000,
      quantity: 2,
      category: 'Informática',
      image: ['notebook.png'],
    });

    expect(product.code).toBe('NOT-0001');
  });
});
