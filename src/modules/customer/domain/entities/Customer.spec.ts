import { makeCustomer } from '@test/Customer/Customer.factory';

describe('Customer entity', () => {
  it('should be able to create a customer', () => {
    const customer = makeCustomer();
    expect(customer).toBeTruthy();
  });

  it('should generate a unique id if not provided', () => {
    const customer = makeCustomer();

    expect(customer.id).toBeDefined();
    expect(typeof customer.id).toBe('string');
  });
});
