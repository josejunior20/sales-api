import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

export interface DeleteIndividualCustomerRequest {
  customerId: string;
}

@Injectable()
export class DeleteBusinessCustomerService {
  constructor(private businessCustomerRepository: BusinessCustomerRepository) {}

  async execute({
    customerId,
  }: DeleteIndividualCustomerRequest): Promise<void> {
    const customer = await this.businessCustomerRepository.findById(customerId);
    if (!customer) throw new CustomerNotFoundException();
    await this.businessCustomerRepository.delete(customerId);
  }
}
