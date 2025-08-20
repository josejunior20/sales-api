import { Customer } from '@modules/customer/domain/entities/Customer';
import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { GetAllBusinessCustomerService } from './Get-all-business-customer.service';

let inMemoryBusinessCustomerRepository: InMemoryBusinessCustomerRepository;
let getAllBusinessCustomerService: GetAllBusinessCustomerService;

describe('Get all Business customer', () => {
  beforeEach(() => {
    inMemoryBusinessCustomerRepository =
      new InMemoryBusinessCustomerRepository();
    getAllBusinessCustomerService = new GetAllBusinessCustomerService(
      inMemoryBusinessCustomerRepository,
    );
  });

  it('should return all persisted business customers', async () => {
    const customer01 = makeBusinessCustomer();
    const customer02 = makeBusinessCustomer({ cnpj: '1245253678-1' });
    const customer03 = makeBusinessCustomer({ cnpj: '4585253678-1' });
    const customer04 = makeBusinessCustomer({ cnpj: '7895253678-1' });

    inMemoryBusinessCustomerRepository.customers = [
      customer01,
      customer02,
      customer03,
      customer04,
    ];

    const { customers } = await getAllBusinessCustomerService.execute();

    expect(customers).toHaveLength(4);
    expect(customers).toEqual(
      expect.arrayContaining([customer01, customer02, customer03, customer04]),
    );
  });

  it('Should return an empty array if no customers are found', async () => {
    const { customers } = await getAllBusinessCustomerService.execute();

    expect(customers).toHaveLength(0);
    expect(customers).toEqual([]);
  });
});
