import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';
import { InMemoryBusinessCustomerRepository } from '@test/Customer/repositories/in-memory-business-customer.repository';

import { UpdateBusinessCustomer } from './Update-business-customer.service';

let updateBusinessCustomer: UpdateBusinessCustomer;
let inMemoryBusinessCustomer: InMemoryBusinessCustomerRepository;

describe('Update Business Customer', () => {
  beforeEach(() => {
    inMemoryBusinessCustomer = new InMemoryBusinessCustomerRepository();
    updateBusinessCustomer = new UpdateBusinessCustomer(
      inMemoryBusinessCustomer,
    );
  });

  it('Should be able to update a business customer', async () => {
    const customer = makeBusinessCustomer();
    await inMemoryBusinessCustomer.create(customer);

    const result = await updateBusinessCustomer.execute({
      customerId: customer.id,
      companyName: 'New Company Name',
      tradeName: 'New Trade Name',
      email: 'newmail@example.com',
      phone: '987654321',
      address: 'Rua Persistência, nº 45',
    });

    expect(result.customer.companyName).toEqual('New Company Name');
    expect(result.customer.tradeName).toEqual('New Trade Name');
    expect(result.customer.email.getValue()).toEqual('newmail@example.com');
    expect(result.customer.phone.getValue()).toEqual('987654321');
    expect(result.customer.address).toEqual('Rua Persistência, nº 45');
  });

  it('Should throw if customer does not exist', async () => {
    await expect(() =>
      updateBusinessCustomer.execute({
        customerId: 'non-existing-id',
        companyName: 'New Company Name',
        tradeName: 'New Trade Name',
        email: 'newmail@example.com',
        phone: '987654321',
        address: 'Rua Persistência, nº 45',
      }),
    ).rejects.toThrow(CustomerNotFoundException);
  });

  it('Should throw when trying to update with invalid email', async () => {
    const customer = makeBusinessCustomer();
    await inMemoryBusinessCustomer.create(customer);

    await expect(
      updateBusinessCustomer.execute({
        customerId: customer.id,
        companyName: 'New Company Name',
        tradeName: 'New Trade Name',
        email: 'invalid-email',
        phone: '987654321',
        address: 'Rua Persistência, nº 45',
      }),
    ).rejects.toThrowError();
  });

  it('Should persist updated customer in repository', async () => {
    const customer = makeBusinessCustomer();
    await inMemoryBusinessCustomer.create(customer);
    await updateBusinessCustomer.execute({
      customerId: customer.id,
      companyName: 'New Company Name',
      tradeName: 'New Trade Name',
      email: 'newmail@example.com',
      phone: '987654321',
      address: 'Rua Persistência, nº 45',
    });
    const customerUpdated = await inMemoryBusinessCustomer.findById(
      customer.id,
    );
    expect(customerUpdated).toBeDefined();
    expect(customerUpdated.companyName).toEqual('New Company Name');
    expect(customerUpdated.tradeName).toEqual('New Trade Name');
    expect(customerUpdated.email.getValue()).toEqual('newmail@example.com');
    expect(customerUpdated.phone.getValue()).toEqual('987654321');
    expect(customerUpdated.address).toEqual('Rua Persistência, nº 45');
  });
});
