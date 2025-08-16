import {
  Customer,
  CustomerProps,
} from '@modules/customer/domain/entities/Customer';

type Override = Partial<CustomerProps>;

export function makeCustomer(override: Override = {}) {
  return new Customer({
    email: 'newcustomer@mail.com',
    phone: '99-99999-9999',
    address: 'Rua: customer, n: 1, Bairro',
    ...override,
  });
}
