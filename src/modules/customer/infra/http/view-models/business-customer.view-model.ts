import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';

export class BusinessCustomerViewModel {
  static toHttp(customer: BusinessCustomer) {
    return {
      id: customer.id,
      companyName: customer.companyName,
      tradeName: customer.tradeName,
      cnpj: customer.cnpj,
      email: customer.email.getValue(),
      phone: customer.phone.getValue(),
      address: customer.address,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
