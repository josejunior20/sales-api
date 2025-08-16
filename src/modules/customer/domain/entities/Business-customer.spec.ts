import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';

describe('Business Customer entity', () => {
  it('should create an BusinessCustomer with default values', () => {
    const customer = makeBusinessCustomer();

    expect(customer.companyName).toBe('jhon.doe.me');
    expect(customer.tradeName).toBe('Super e-commerce');
    expect(customer.cnpj).toBe('123.456.789-00');
  });

  it('should allow overriding values', () => {
    const customer = makeBusinessCustomer({
      companyName: 'teste.me',
      tradeName: 'myBooks livraria',
      cnpj: '124.589.631-20',
    });

    expect(customer.companyName).toBe('teste.me');
    expect(customer.tradeName).toBe('myBooks livraria');
    expect(customer.cnpj).toBe('124.589.631-20');
  });
});
