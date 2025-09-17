import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

type RawBusinessCustomer = {
  customerId: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
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
export class PrismaBusinessCustomerMapper {
  static toPrismaCreate(customer: BusinessCustomer) {
    return {
      companyName: customer.companyName,
      tradeName: customer.tradeName,
      cnpj: customer.cnpj,
      customer: {
        create: {
          id: customer.id,
          type: 'BUSINESS',
          email: customer.email.getValue(),
          phone: customer.phone.getValue(),
          address: customer.address,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        },
      },
    };
  }

  static toPrismaUpdate(customer: BusinessCustomer) {
    return {
      companyName: customer.companyName,
      tradeName: customer.tradeName,
      cnpj: customer.cnpj,
      customer: {
        update: {
          id: customer.id,
          type: 'BUSINESS',
          email: customer.email.getValue(),
          phone: customer.phone.getValue(),
          address: customer.address,
          updatedAt: customer.updatedAt,
        },
      },
    };
  }

  static toDomain(raw: RawBusinessCustomer): BusinessCustomer {
    return new BusinessCustomer({
      id: raw.customer.id,
      companyName: raw.companyName,
      tradeName: raw.tradeName,
      cnpj: raw.cnpj,
      email: new Email(raw.customer.email),
      phone: new Phone(raw.customer.phone),
      address: raw.customer.address,
      createdAt: raw.customer.createdAt,
      updatedAt: raw.customer.updatedAt,
    });
  }
}
