import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

import { BusinessCustomer } from '../entities/Business-customer';
import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

export interface CreateBusinessCustomerRequest {
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
export class CreateBusinessCustomerService {
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
    const customerAlreadyExists = await this.customerRepository.findByCnpj(
      cnpj,
    );
    if (customerAlreadyExists) throw new CustomerConflictException();

    const customer = new BusinessCustomer({
      address,
      companyName,
      tradeName,
      cnpj,
      email: new Email(email),
      phone: new Phone(phone),
    });

    await this.customerRepository.create(customer);
    return { customer };
  }
}
