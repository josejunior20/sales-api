import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';
import { Cpf } from '@shared/domain/values-objects/cpf.value-object';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';

import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';
import { IndividualCustomer } from './../entities/Individual-customer';

export interface CreateIndividualCustomerRequest {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
}
interface CreateIndividualCustomerResponse {
  customer: IndividualCustomer;
}

@Injectable()
export class CreateIndividualCustomerService {
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
    const customerAlreadyExists = await this.customerRepository.findByCpf(cpf);
    if (customerAlreadyExists) throw new CustomerConflictException();

    const customer = new IndividualCustomer({
      name,
      address,
      cpf: new Cpf(cpf),
      email: new Email(email),
      phone: new Phone(phone),
    });

    await this.customerRepository.create(customer);
    return { customer };
  }
}
