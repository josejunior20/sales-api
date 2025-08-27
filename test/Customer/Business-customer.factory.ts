import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { CustomerProps } from '@modules/customer/domain/entities/Customer';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

type BusinessOverride = Partial<CustomerProps> & {
  companyName?: string;
  tradeName?: string;
  cnpj?: string;
};

export function makeBusinessCustomer(override: BusinessOverride = {}) {
  return new BusinessCustomer({
    companyName: 'jhon.doe.me',
    tradeName: 'Super e-commerce',
    cnpj: '12.456.789/0000-00',
    email: new Email('businessl@mail.com'),
    phone: new Phone('(11) 99999-8888'),
    address: 'Rua: teste, nº 123, Bairro: Centro',
    ...override,
  });
}
