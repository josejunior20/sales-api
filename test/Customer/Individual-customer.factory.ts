import { CustomerProps } from '@modules/customer/domain/entities/Customer';
import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';

type IndividualOverride = Partial<CustomerProps> & {
  name?: string;
  cpf?: string;
};

export function makeIndividualCustomer(override: IndividualOverride = {}) {
  return new IndividualCustomer({
    name: 'John Doe',
    cpf: '123.456.789-00',
    email: 'individual@mail.com',
    phone: '11-99999-8888',
    address: 'Rua: teste, nº 123, Bairro: Centro',
    ...override,
  });
}
