import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import {
  makeBusinessCustomer,
  makeBusinessCustomerRequest,
} from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { CreateBusinessCustomerService } from './Create-business-customer.service';

let createBusinessCustomer: CreateBusinessCustomerService;
let inMemoryCustomerRepository: InMemoryBusinessCustomerRepository;

describe('Create Business Customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryBusinessCustomerRepository();
    createBusinessCustomer = new CreateBusinessCustomerService(
      inMemoryCustomerRepository,
    );
  });

  it('should be able to add a Business customer manually to repo', () => {
    const customer = makeBusinessCustomer();
    inMemoryCustomerRepository.customers = [customer];

    expect(inMemoryCustomerRepository.customers).toHaveLength(1);
    expect(inMemoryCustomerRepository.customers[0]).toEqual(customer);
  });

  it('should persist customer in repository when created', async () => {
    const request = makeBusinessCustomerRequest();

    const { customer } = await createBusinessCustomer.execute(request);

    expect(inMemoryCustomerRepository.customers).toContain(customer);

    const found = await inMemoryCustomerRepository.findByCnpj(request.cnpj);
    expect(found).toBeTruthy();
    expect(found?.id).toEqual(customer.id);
  });

  it('should return the created customer', async () => {
    const request = makeBusinessCustomerRequest();

    const { customer } = await createBusinessCustomer.execute(request);

    expect(customer).toBeDefined();
    expect(customer.companyName).toBe(request.companyName);
    expect(customer.tradeName).toBe(request.tradeName);
    expect(customer.cnpj).toBe('12.456.789/0000-00');
  });

  it('should set id and timestamps when creating a new customer', async () => {
    const request = makeBusinessCustomerRequest();

    const { customer } = await createBusinessCustomer.execute(request);

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toBeInstanceOf(Date);
    expect(customer.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw error when creating business customer with existing cnpj', async () => {
    const request = makeBusinessCustomerRequest();

    await createBusinessCustomer.execute(request);

    await expect(createBusinessCustomer.execute(request)).rejects.toThrow(
      CustomerConflictException,
    );
  });
});
