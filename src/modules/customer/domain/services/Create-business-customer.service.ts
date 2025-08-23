import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

import { BusinessCustomer } from '../entities/Business-customer';
import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

interface CreateBusinessCustomerRequest {
  companyName: string;
  tradeName: string;
  cnpj: string;
  email: Email;
  phone: Phone;
  address: string;
}

interface CreateBusinessCustomerResponse {
  customer: BusinessCustomer;
}
@Injectable()
export class CreateBusinessCustomer {
  constructor(
    private readonly customerRepository: BusinessCustomerRepository,
  ) {}

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
