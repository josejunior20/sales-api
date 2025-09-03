import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { DeleteBusinessCustomerService } from './Delete-business-customer.service';

let deleteBusinessCustomerService: DeleteBusinessCustomerService;
let inMemoryBusinessCustomerRepository: InMemoryBusinessCustomerRepository;

describe('Delete Business Customer', () => {
  beforeEach(() => {
    inMemoryBusinessCustomerRepository =
      new InMemoryBusinessCustomerRepository();
    deleteBusinessCustomerService = new DeleteBusinessCustomerService(
      inMemoryBusinessCustomerRepository,
    );
  });

  it('Should be able to delete a business customer', async () => {
    const customer = makeBusinessCustomer();
    inMemoryBusinessCustomerRepository.customers.push(customer);
    await deleteBusinessCustomerService.execute({ customerId: customer.id });

    expect(inMemoryBusinessCustomerRepository.customers).toHaveLength(0);
  });

  it('Should throw an error if customer is not found', async () => {
    await expect(
      deleteBusinessCustomerService.execute({ customerId: 'fake-id' }),
    ).rejects.toThrow(CustomerNotFoundException);
  });
});
