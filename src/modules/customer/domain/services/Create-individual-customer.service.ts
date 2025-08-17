import { CustomerConflictException } from '@modules/customer/exceptions/customer-conflict.exception';
import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../repositories/Customer.repositories';
import { IndividualCustomer } from './../entities/Individual-customer';

interface CreateIndividualCustomerRequest {
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
export class CreateIndividualCustomer {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({
    name,
    cpf,
    email,
    phone,
    address,
  }: CreateIndividualCustomerRequest): Promise<CreateIndividualCustomerResponse> {
    const customerAlreadExists = await this.customerRepository.findByCpf(cpf);
    if (customerAlreadExists) {
      throw new CustomerConflictException();
    }

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
