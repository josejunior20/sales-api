import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { UpdateIndividualCustomerService } from './update-individual-customer.service';
let updateIndividualCustomer: UpdateIndividualCustomerService;
let inMemoryIndividualCustomerRepository: InMemoryIndividualCustomerRepository;

describe('Update Individual Customer', () => {
  beforeEach(() => {
    inMemoryIndividualCustomerRepository =
      new InMemoryIndividualCustomerRepository();
    updateIndividualCustomer = new UpdateIndividualCustomerService(
      inMemoryIndividualCustomerRepository,
    );
  });

  it('Should be able to update an individual customer', async () => {
    const customer = makeIndividualCustomer();
    await inMemoryIndividualCustomerRepository.create(customer);

    const result = await updateIndividualCustomer.execute({
      customerId: customer.id,
      name: 'John Doe',
      email: '9tV6l@example.com',
      phone: '123456789',
      address: 'Rua: teste, nº 123, Bairro: Centro',
    });

    expect(result.customer.name).toEqual('John Doe');
    expect(result.customer.email.getValue()).toEqual('9tv6l@example.com');
    expect(result.customer.phone.getValue()).toEqual('123456789');
    expect(result.customer.address).toEqual(
      'Rua: teste, nº 123, Bairro: Centro',
    );
  });

  it('Should throw if customer does not exist', async () => {
    await expect(
      updateIndividualCustomer.execute({
        customerId: 'non-existing-id',
        name: 'Fake',
        email: 'fake@example.com',
        phone: '000000000',
        address: 'Nowhere',
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundException);
  });

  it('Should update only the email when other fields remain the same', async () => {
    const customer = makeIndividualCustomer();
    await inMemoryIndividualCustomerRepository.create(customer);

    const result = await updateIndividualCustomer.execute({
      customerId: customer.id,
      name: customer.name,
      email: 'newmail@example.com',
      phone: customer.phone.getValue(),
      address: customer.address,
    });

    expect(result.customer.email.getValue()).toBe('newmail@example.com');
    expect(result.customer.name).toBe(customer.name);
    expect(result.customer.phone.getValue()).toBe(customer.phone.getValue());
    expect(result.customer.address).toBe(customer.address);
  });

  it('Should persist updated customer in repository', async () => {
    const customer = makeIndividualCustomer();
    await inMemoryIndividualCustomerRepository.create(customer);

    await updateIndividualCustomer.execute({
      customerId: customer.id,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987654321',
      address: 'Rua Persistência, nº 45',
    });

    const updated = await inMemoryIndividualCustomerRepository.findById(
      customer.id,
    );

    expect(updated).toBeDefined();
    expect(updated?.name).toBe('Jane Doe');
    expect(updated?.email.getValue()).toBe('jane@example.com');
  });

  it('Should throw when trying to update with invalid email', async () => {
    const customer = makeIndividualCustomer();
    await inMemoryIndividualCustomerRepository.create(customer);

    await expect(
      updateIndividualCustomer.execute({
        customerId: customer.id,
        name: 'Invalid Email User',
        email: 'invalid-email', // sem formato válido
        phone: '123456789',
        address: 'Rua Errada, nº 0',
      }),
    ).rejects.toThrowError();
  });
});
