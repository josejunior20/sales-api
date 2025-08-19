import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { BusinessCustomer } from '../entities/Business-customer';
import { CreateBusinessCustomer } from './Create-business-customer.service';

let createBusinessCustomer: CreateBusinessCustomer;
let inMemoryCustomerRepository: InMemoryBusinessCustomerRepository;

describe(' Create Business customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryBusinessCustomerRepository();
    createBusinessCustomer = new CreateBusinessCustomer(
      inMemoryCustomerRepository,
    );
  });

  it('Should be able to throw error when create individual customer with already exist cnpj', () => {
    const customer = makeBusinessCustomer();

    inMemoryCustomerRepository.customers = [customer];

    expect(
      async () => await createBusinessCustomer.execute(makeBusinessCustomer()),
    ).rejects.toThrow(CustomerConflictException);
  });
  it('should be able to create a individual customer ', () => {
    const customer = makeBusinessCustomer();
    inMemoryCustomerRepository.customers = [customer];

    expect(inMemoryCustomerRepository.customers).toHaveLength(1);
    expect(inMemoryCustomerRepository.customers[0]).toEqual(customer);
  });

  it('should persist customer in repository when created', async () => {
    const request = makeBusinessCustomer();

    await createBusinessCustomer.execute(request);

    expect(inMemoryCustomerRepository.customers).toHaveLength(1);
    expect(inMemoryCustomerRepository.customers[0]).toBeInstanceOf(
      BusinessCustomer,
    );
    expect(
      (inMemoryCustomerRepository.customers[0] as BusinessCustomer).cnpj,
    ).toBe(request.cnpj);
  });

  it('should return the created customer', async () => {
    const request = makeBusinessCustomer();

    const { customer } = await createBusinessCustomer.execute(request);

    expect(customer).toBeInstanceOf(BusinessCustomer);
    expect(customer.cnpj).toBe(request.cnpj);
  });

  it('should set id and timestamps when creating a new customer', async () => {
    const request = makeBusinessCustomer();

    const { customer } = await createBusinessCustomer.execute(request);

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toBeInstanceOf(Date);
    expect(customer.updatedAt).toBeInstanceOf(Date);
  });
});
