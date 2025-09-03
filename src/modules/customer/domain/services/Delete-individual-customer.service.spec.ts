import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { DeleteIndividualCustomerService } from './Delete-individual-customer.service';

let deleteIndividualCustomerService: DeleteIndividualCustomerService;
let inMemoryIndividualCustomerRepository: InMemoryIndividualCustomerRepository;

describe('Delete Individual Customer', () => {
  beforeEach(() => {
    inMemoryIndividualCustomerRepository =
      new InMemoryIndividualCustomerRepository();
    deleteIndividualCustomerService = new DeleteIndividualCustomerService(
      inMemoryIndividualCustomerRepository,
    );
  });

  it('Should be able to delete an individual customer', async () => {
    const customer = makeIndividualCustomer();
    await inMemoryIndividualCustomerRepository.create(customer);

    await deleteIndividualCustomerService.execute({
      customerId: customer.id,
    });

    expect(inMemoryIndividualCustomerRepository.customers).toHaveLength(0);
  });

  it('Should throw if customer does not exist', async () => {
    await expect(
      deleteIndividualCustomerService.execute({
        customerId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundException);
  });
});
