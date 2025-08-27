import { makeIndividualCustomer } from '@test/Customer/Individual-customer.factory';

describe('Individual Customer entity', () => {
  it('should create an IndividualCustomer with default values', () => {
    const customer = makeIndividualCustomer();

    expect(customer.name).toBe('John Doe');
    expect(customer.cpf).toBe('123.456.789-00');
  });

  it('should allow overriding values', () => {
    const customer = makeIndividualCustomer({
      name: 'Jane Smith',
      cpf: '987.654.321-00',
    });

    expect(customer.name).toBe('Jane Smith');
    expect(customer.cpf).toBe('987.654.321-00');
  });
});
