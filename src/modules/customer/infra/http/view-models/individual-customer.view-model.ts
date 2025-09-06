import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
export class IndividualCustomerViewModel {
  static toHttp(customer: IndividualCustomer) {
    return {
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
      email: customer.email.getValue(),
      phone: customer.phone.getValue(),
      address: customer.address,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
