import { CustomerProps } from '@modules/customer/domain/entities/Customer';
import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
import { CreateIndividualCustomerRequest } from '@modules/customer/domain/services/Create-individual-customer.service';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

type IndividualOverride = Partial<CustomerProps> & {
  name?: string;
  cpf?: string;
};
// factory para entidade
export function makeIndividualCustomer(override: IndividualOverride = {}) {
  return new IndividualCustomer({
    name: 'John Doe',
    cpf: '123.456.789-00',
    email: new Email('individual@mail.com'),
    phone: new Phone('(11) 99999-8888'),
    address: 'Rua: teste, nº 123, Bairro: Centro',
    ...override,
  });
}
// factory para request
export function makeIndividualCustomerRequest(
  override: Partial<CreateIndividualCustomerRequest> = {},
): CreateIndividualCustomerRequest {
  return {
    name: 'John Doe',
    cpf: '123.456.789-00',
    email: 'individual@mail.com',
    phone: '(11) 99999-8888',
    address: 'Rua: teste, nº 123, Bairro: Centro',
    ...override,
  };
}
