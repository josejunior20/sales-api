import { makeBusinessCustomer } from '@test/Customer/Business-customer.factory';

describe('Business Customer entity', () => {
  it('should create an BusinessCustomer with default values', () => {
    const customer = makeBusinessCustomer();

    expect(customer.companyName).toBe('jhon.doe.me');
    expect(customer.tradeName).toBe('Super e-commerce');
    expect(customer.cnpj).toBe('12.456.789/0000-00');
  });

  it('should allow overriding values', () => {
    const customer = makeBusinessCustomer({
      companyName: 'teste.me',
      tradeName: 'myBooks livraria',
      cnpj: '12.589.631/0000-20',
    });

    expect(customer.companyName).toBe('teste.me');
    expect(customer.tradeName).toBe('myBooks livraria');
    expect(customer.cnpj).toBe('12.589.631/0000-20');
  });
});
