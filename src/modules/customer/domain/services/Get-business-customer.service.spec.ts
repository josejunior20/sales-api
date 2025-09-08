import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { GetBusinessCustomerService } from './Get-business-customer.service';

let inMemoryBusinessCustomerRepository: InMemoryBusinessCustomerRepository;
let getBusinessCustomerService: GetBusinessCustomerService;

describe('Get Business Customer', () => {
  beforeEach(async () => {
    inMemoryBusinessCustomerRepository =
      new InMemoryBusinessCustomerRepository();
    getBusinessCustomerService = new GetBusinessCustomerService(
      inMemoryBusinessCustomerRepository,
    );
  });

  it('should be able to get customer', async () => {
    const customer = makeBusinessCustomer();
    const customer1 = makeBusinessCustomer();

    inMemoryBusinessCustomerRepository.customers = [customer, customer1];

    await getBusinessCustomerService.execute({ customerId: customer.id });

    expect(inMemoryBusinessCustomerRepository.customers[0]).toEqual(customer);
  });

  it('should be able to throw error when not found customer', async () => {
    const customer = makeBusinessCustomer();

    inMemoryBusinessCustomerRepository.customers = [customer];

    expect(async () => {
      await getBusinessCustomerService.execute({ customerId: ' ' });
    }).rejects.toThrowError(CustomerNotFoundException);
  });
});
