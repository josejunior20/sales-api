import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { CustomerProps } from '@modules/customer/domain/entities/Customer';

type BusinessOverride = Partial<CustomerProps> & {
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
};

export function makeBusinessCustomer(override: BusinessOverride = {}) {
  return new BusinessCustomer({
    companyName: 'jhon.doe.me',
    tradeName: 'Super e-commerce',
    cnpj: '123.456.789-00',
    email: 'individual@mail.com',
    phone: '11-99999-8888',
    address: 'Rua: teste, nº 123, Bairro: Centro',
    ...override,
  });
}
