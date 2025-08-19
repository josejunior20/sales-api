import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { GetAllIndividualCustomerService } from './Get-all-individual-customer.service';

let getAllIndividualCustomer: GetAllIndividualCustomerService;
let inMemoryIndividualCustomer: InMemoryIndividualCustomerRepository;
describe('Get All Individual Customers', () => {
  beforeEach(() => {
    inMemoryIndividualCustomer = new InMemoryIndividualCustomerRepository();
    getAllIndividualCustomer = new GetAllIndividualCustomerService(
      inMemoryIndividualCustomer,
    );
  });

  it('should return all persisted individual customers', async () => {
    const customer01 = makeIndividualCustomer({ cpf: '111-111-111-11' });
    const customer02 = makeIndividualCustomer({ cpf: '222-222-222-22' });
    const customer03 = makeIndividualCustomer({ cpf: '333-333-333-33' });
    const customer04 = makeIndividualCustomer({ cpf: '444-444-444-44' });

    inMemoryIndividualCustomer.customers = [
      customer01,
      customer02,
      customer03,
      customer04,
    ];

    const { customers } = await getAllIndividualCustomer.execute();
    expect(customers).toHaveLength(4);
    expect(customers).toEqual(
      expect.arrayContaining([customer01, customer02, customer03, customer04]),
    );
  });

  it('Should return an empty array if no customers are found', async () => {
    const { customers } = await getAllIndividualCustomer.execute();

    expect(customers).toHaveLength(0);
    expect(customers).toEqual([]);
  });
});
