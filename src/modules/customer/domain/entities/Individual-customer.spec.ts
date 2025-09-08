import { Cpf } from '@shared/domain/values-objects/cpf.value-object';
import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';

describe('Individual Customer entity', () => {
  it('should create an IndividualCustomer with default values', () => {
    const customer = makeIndividualCustomer();

    expect(customer.name).toBe('John Doe');
    expect(customer.cpf.getValue()).toBe('45663455809');
  });

  it('should allow overriding values', () => {
    const customer = makeIndividualCustomer({
      name: 'Jane Smith',
      cpf: new Cpf('29918688130'),
    });

    expect(customer.name).toBe('Jane Smith');
    expect(customer.cpf.getValue()).toBe('29918688130');
  });
});
