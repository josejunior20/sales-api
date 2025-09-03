import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';

import { BusinessCustomer } from '../entities/Business-customer';
import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

export interface UpdateBusinessCustomerRequest {
  customerId: string;
  companyName: string;
  tradeName: string;
  email: string;
  phone: string;
  address: string;
}

interface UpdateBusinessCustomerResponse {
  customer: BusinessCustomer;
}

export class UpdateBusinessCustomer {
  constructor(private businessCustomerRepository: BusinessCustomerRepository) {}

  async execute({
    customerId,
    companyName,
    tradeName,
    email,
    phone,
    address,
  }: UpdateBusinessCustomerRequest): Promise<UpdateBusinessCustomerResponse> {
    const customer = await this.businessCustomerRepository.findById(customerId);
    if (!customer) throw new CustomerNotFoundException();

    customer.updateProfile({
      companyName,
      tradeName,
      email,
      phone,
      address,
    });

    await this.businessCustomerRepository.save(customer);
    return { customer };
  }
}
