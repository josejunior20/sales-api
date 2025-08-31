import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import {
  makeIndividualCustomer,
  makeIndividualCustomerRequest,
} from '@test/Customer/Individual-customer.factory';
import { InMemoryIndividualCustomerRepository } from '@test/Customer/repositories/in-memory-individual-customer.repository';

import { IndividualCustomer } from '../entities/Individual-customer';
import { CreateIndividualCustomer } from './Create-individual-customer.service';

let createIndividualCustomer: CreateIndividualCustomer;
let inMemoryCustomerRepository: InMemoryIndividualCustomerRepository;

describe('Create Individual Customer', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryIndividualCustomerRepository();
    createIndividualCustomer = new CreateIndividualCustomer(
      inMemoryCustomerRepository,
    );
  });

  it('Should throw error when creating customer with existing cpf', async () => {
    const existingCustomer = makeIndividualCustomer();
    inMemoryCustomerRepository.customers = [existingCustomer];

    await expect(
      createIndividualCustomer.execute(
        makeIndividualCustomerRequest({ cpf: existingCustomer.cpf }),
      ),
    ).rejects.toThrow(CustomerConflictException);
  });

  it('should be able to create a individual customer ', () => {
    const customer = makeIndividualCustomer();
    inMemoryCustomerRepository.customers = [customer];

    expect(inMemoryCustomerRepository.customers).toHaveLength(1);
    expect(inMemoryCustomerRepository.customers[0]).toEqual(customer);
  });

  it('should be able to add a customer in memory repository manually', async () => {
    const request = makeIndividualCustomerRequest();
    await createIndividualCustomer.execute(request);

    expect(inMemoryCustomerRepository.customers).toHaveLength(1);
    expect(inMemoryCustomerRepository.customers[0]).toBeInstanceOf(
      IndividualCustomer,
    );
    expect(
      (inMemoryCustomerRepository.customers[0] as IndividualCustomer).cpf,
    ).toBe(request.cpf);
  });

  it('should return the created customer', async () => {
    const request = makeIndividualCustomerRequest();

    const { customer } = await createIndividualCustomer.execute(request);

    expect(customer).toBeInstanceOf(IndividualCustomer);
    expect(customer.cpf).toBe(customer.cpf);
  });

  it('should set id and timestamps when creating a new customer', async () => {
    const request = makeIndividualCustomerRequest();
    const { customer } = await createIndividualCustomer.execute(request);

    expect(customer.id).toBeDefined();
    expect(customer.createdAt).toBeInstanceOf(Date);
    expect(customer.updatedAt).toBeInstanceOf(Date);
  });
});
