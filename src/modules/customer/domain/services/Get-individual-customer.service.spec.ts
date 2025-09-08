import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { GetIndividualCustomerService } from './Get-individual-customer.service';

let inMemoryIndividualCustomerRepository: InMemoryIndividualCustomerRepository;
let getIndividualCustomerService: GetIndividualCustomerService;

describe('Get Individual Customer', () => {
  beforeEach(async () => {
    inMemoryIndividualCustomerRepository =
      new InMemoryIndividualCustomerRepository();
    getIndividualCustomerService = new GetIndividualCustomerService(
      inMemoryIndividualCustomerRepository,
    );
  });

  it('should be able to get customer', async () => {
    const customer = makeIndividualCustomer();
    const customer1 = makeIndividualCustomer();

    inMemoryIndividualCustomerRepository.customers = [customer, customer1];

    await getIndividualCustomerService.execute({ customerId: customer.id });

    expect(inMemoryIndividualCustomerRepository.customers[0]).toEqual(customer);
  });

  it('should be able to throw error when not found customer', async () => {
    const customer = makeIndividualCustomer();

    inMemoryIndividualCustomerRepository.customers = [customer];

    expect(async () => {
      await getIndividualCustomerService.execute({ customerId: ' ' });
    }).rejects.toThrowError(CustomerNotFoundException);
  });
});
