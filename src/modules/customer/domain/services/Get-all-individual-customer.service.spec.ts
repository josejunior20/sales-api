import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { GetAllIndividualCustomerService } from './Get-all-individual-customer.service';

let getAllIndividualCustomerService: GetAllIndividualCustomerService;
let inMemoryIndividualCustomerRepository: InMemoryIndividualCustomerRepository;
describe('Get all Individual Customers (with pagination)', () => {
  beforeEach(() => {
    inMemoryIndividualCustomerRepository =
      new InMemoryIndividualCustomerRepository();
    getAllIndividualCustomerService = new GetAllIndividualCustomerService(
      inMemoryIndividualCustomerRepository,
    );
  });

  it('Should return all persisted business customers when no pagination params are given (default)', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryIndividualCustomerRepository.customers.push(
        makeIndividualCustomer(),
      );
    }

    const result = await getAllIndividualCustomerService.execute(1, 10);

    expect(result.customers).toHaveLength(6);
    expect(result.total).toBe(6);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.lastPage).toBe(1);
  });

  it('Should return an empty array if no customers are found', async () => {
    const result = await getAllIndividualCustomerService.execute(1, 10);

    expect(result.customers).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.lastPage).toBe(1);
  });

  it('Should return only the first page of customers', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryIndividualCustomerRepository.customers.push(
        makeIndividualCustomer(),
      );
    }

    const result = await getAllIndividualCustomerService.execute(1, 2);

    expect(result.customers).toHaveLength(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(6);
    expect(result.lastPage).toBe(3);
  });

  it('Should return the second page of customers', async () => {
    for (let i = 0; i < 6; i++) {
      inMemoryIndividualCustomerRepository.customers.push(
        makeIndividualCustomer(),
      );
    }

    const result = await getAllIndividualCustomerService.execute(2, 2);

    expect(result.customers).toHaveLength(2);
    expect(result.page).toBe(2);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(6);
    expect(result.lastPage).toBe(3);
  });

  it('Should return the last page with remaining customers', async () => {
    for (let i = 0; i < 5; i++) {
      inMemoryIndividualCustomerRepository.customers.push(
        makeIndividualCustomer(),
      );
    }

    const result = await getAllIndividualCustomerService.execute(3, 2);

    expect(result.customers).toHaveLength(1);
    expect(result.page).toBe(3);
    expect(result.limit).toBe(2);
    expect(result.total).toBe(5);
    expect(result.lastPage).toBe(3);
  });
});
