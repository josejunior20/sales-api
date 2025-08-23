import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';
import { IndividualCustomer } from './../entities/Individual-customer';

interface CreateIndividualCustomerRequest {
  name: string;
  cpf: string;
  email: Email;
  phone: Phone;
  address: string;
}
interface CreateIndividualCustomerResponse {
  customer: IndividualCustomer;
}

@Injectable()
export class CreateIndividualCustomer {
  constructor(
    private readonly customerRepository: IndividualCustomerRepository,
  ) {}

  async execute({
    name,
    cpf,
    email,
    phone,
    address,
  }: CreateIndividualCustomerRequest): Promise<CreateIndividualCustomerResponse> {
    const customerAlreadExists = await this.customerRepository.findByCpf(cpf);
    if (customerAlreadExists) throw new CustomerConflictException();

    const customer = new IndividualCustomer({
      address,
      cpf,
      email,
      name,
      phone,
    });

    await this.customerRepository.create(customer);
    return { customer };
  }
}
