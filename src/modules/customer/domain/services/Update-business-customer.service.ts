import { CustomerEmailConflictException } from '@modules/customer/exceptions/customer-email-conflict.exception copy';
import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { BusinessCustomer } from '../entities/Business-customer';
import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

export interface UpdateBusinessCustomerRequest {
  customerId: string;
  companyName?: string;
  tradeName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface UpdateBusinessCustomerResponse {
  customer: BusinessCustomer;
}
@Injectable()
export class UpdateBusinessCustomerService {
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

    if (email && email !== customer.email.getValue()) {
      const existingEmailCustomer =
        await this.businessCustomerRepository.findByEmail(email);
      if (existingEmailCustomer && existingEmailCustomer.id !== customer.id) {
        throw new CustomerEmailConflictException();
      }
    }

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
