import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';

import { BusinessCustomer } from '../entities/Business-customer';
import { CustomerRepository } from '../repositories/Customer.repositories';

interface CreateBusinessCustomerRequest {
  companyName: string;
  tradeName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

interface CreateBusinessCustomerResponse {
  customer: BusinessCustomer;
}
@Injectable()
export class CreateBusinessCustomer {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({
    companyName,
    tradeName,
    cnpj,
    email,
    phone,
    address,
  }: CreateBusinessCustomerRequest): Promise<CreateBusinessCustomerResponse> {
    const customerAlreadExists = await this.customerRepository.findByCnpj(cnpj);
    if (customerAlreadExists) throw new CustomerConflictException();

    const customer = new BusinessCustomer({
      address,
      cnpj,
      companyName,
      email,
      phone,
      tradeName,
    });

    await this.customerRepository.create(customer);
    return { customer };
  }
}
