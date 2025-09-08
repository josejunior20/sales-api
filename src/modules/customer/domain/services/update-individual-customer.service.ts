import { CustomerEmailConflictException } from '@modules/customer/exceptions/customer-email-conflict.exception copy';
import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { IndividualCustomer } from '../entities/Individual-customer';
import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

export interface UpdateIndividualCustomerRequest {
  customerId: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface UpdateIndividualCustomerResponse {
  customer: IndividualCustomer;
}
@Injectable()
export class UpdateIndividualCustomerService {
  constructor(
    private readonly individualCustomerRepository: IndividualCustomerRepository,
  ) {}

  async execute({
    customerId,
    name,
    email,
    phone,
    address,
  }: UpdateIndividualCustomerRequest): Promise<UpdateIndividualCustomerResponse> {
    const customer = await this.individualCustomerRepository.findById(
      customerId,
    );
    if (!customer) throw new CustomerNotFoundException();
    if (email && email !== customer.email.getValue()) {
      const existingEmailCustomer =
        await this.individualCustomerRepository.findByEmail(email);
      if (existingEmailCustomer && existingEmailCustomer.id !== customer.id) {
        throw new CustomerEmailConflictException();
      }
    }

    customer.updateProfile({ name, address, phone, email });

    await this.individualCustomerRepository.save(customer);
    return { customer };
  }
}
