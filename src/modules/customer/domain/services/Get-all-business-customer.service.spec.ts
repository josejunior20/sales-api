import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { GetAllBusinessCustomerService } from './Get-all-business-customer.service';

let inMemoryBusinessCustomerRepository: InMemoryBusinessCustomerRepository;
let getAllBusinessCustomerService: GetAllBusinessCustomerService;

describe('Get all Business Customers (with pagination)', () => {
  beforeEach(() => {
    inMemoryBusinessCustomerRepository =
      new InMemoryBusinessCustomerRepository();
    getAllBusinessCustomerService = new GetAllBusinessCustomerService(
      inMemoryBusinessCustomerRepository,
    );
  });

  it('Should return all persisted business customers when no pagination params are given (default)', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryBusinessCustomerRepository.customers.push(
        makeBusinessCustomer({ cnpj: `CNPJ-${i}` }),
      );
    }

    const result = await getAllBusinessCustomerService.execute(1, 10);

    expect(result.customers).toHaveLength(6);
    expect(result.total).toBe(6);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.lastPage).toBe(1);
  });

  it('Should return an empty array if no customers are found', async () => {
    const result = await getAllBusinessCustomerService.execute(1, 10);

    expect(result.customers).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.lastPage).toBe(1);
  });

  it('Should return only the first page of customers', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryBusinessCustomerRepository.customers.push(
        makeBusinessCustomer({ cnpj: `CNPJ-${i}` }),
      );
    }

    const result = await getAllBusinessCustomerService.execute(1, 2);

    expect(result.customers).toHaveLength(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(6);
    expect(result.lastPage).toBe(3);
  });

  it('Should return the second page of customers', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryBusinessCustomerRepository.customers.push(
        makeBusinessCustomer({ cnpj: `CNPJ-${i}` }),
      );
    }

    const result = await getAllBusinessCustomerService.execute(2, 2);

    expect(result.customers).toHaveLength(2);
    expect(result.page).toBe(2);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(6);
    expect(result.lastPage).toBe(3);
  });

  it('Should return the last page with remaining customers', async () => {
    for (let i = 0; i < 5; i++) {
      inMemoryBusinessCustomerRepository.customers.push(
        makeBusinessCustomer({ cnpj: `CNPJ-${i}` }),
      );
    }

    const result = await getAllBusinessCustomerService.execute(3, 2);

    expect(result.customers).toHaveLength(1);
    expect(result.page).toBe(3);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(5);
    expect(result.lastPage).toBe(3);
  });
});
