import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

export interface DeleteIndividualCustomerRequest {
  customerId: string;
}
@Injectable()
export class DeleteIndividualCustomerService {
  constructor(
    private individualCustomerRepository: IndividualCustomerRepository,
  ) {}

  async execute({
    customerId,
  }: DeleteIndividualCustomerRequest): Promise<void> {
    const customer = await this.individualCustomerRepository.findById(
      customerId,
    );
    if (!customer) throw new CustomerNotFoundException();
    await this.individualCustomerRepository.delete(customerId);
  }
}
