import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { IndividualCustomer } from '../entities/Individual-customer';
import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

interface GetIndividualCustomersRequest {
  customerId: string;
}

interface GetIndividualCustomersResponse {
  customer: IndividualCustomer;
}

@Injectable()
export class GetIndividualCustomerService {
  constructor(
    private readonly customerRepository: IndividualCustomerRepository,
  ) {}

  async execute({
    customerId,
  }: GetIndividualCustomersRequest): Promise<GetIndividualCustomersResponse> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new CustomerNotFoundException();
    return { customer };
  }
}
