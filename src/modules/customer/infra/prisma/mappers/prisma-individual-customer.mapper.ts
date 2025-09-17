import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
import { Cpf } from '@shared/domain/values-objects/cpf.value-object';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

type RawIndividualCustomer = {
  customerId: string;
  name: string;
  cpf: string;
  customer: {
    id: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export class PrismaIndividualCustomerMapper {
  static toPrismaCreate(customer: IndividualCustomer) {
    return {
      name: customer.name,
      cpf: customer.cpf.getValue(),
      customer: {
        create: {
          id: customer.id,
          type: 'INDIVIDUAL',
          email: customer.email.getValue(),
          phone: customer.phone.getValue(),
          address: customer.address,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        },
      },
    };
  }

  static toPrismaUpdate(customer: IndividualCustomer) {
    return {
      name: customer.name,
      cpf: customer.cpf.getValue(),
      customer: {
        update: {
          email: customer.email.getValue(),
          phone: customer.phone.getValue(),
          address: customer.address,
          updatedAt: customer.updatedAt,
        },
      },
    };
  }

  static toDomain(raw: RawIndividualCustomer): IndividualCustomer {
    return new IndividualCustomer({
      id: raw.customer.id,
      name: raw.name,
      cpf: new Cpf(raw.cpf),
      email: new Email(raw.customer.email),
      phone: new Phone(raw.customer.phone),
      address: raw.customer.address,
      createdAt: raw.customer.createdAt,
      updatedAt: raw.customer.updatedAt,
    });
  }
}
