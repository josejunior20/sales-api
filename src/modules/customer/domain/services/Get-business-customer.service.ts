import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';
import { Injectable } from '@nestjs/common';

import { BusinessCustomer } from '../entities/Business-customer';
import { BusinessCustomerRepository } from '../repositories/Business-customer.repository';

interface GetBusinessCustomersRequest {
  customerId: string;
}

interface GetBusinessCustomersResponse {
  customer: BusinessCustomer;
}

@Injectable()
export class GetBusinessCustomerService {
  constructor(
    private readonly customerRepository: BusinessCustomerRepository,
  ) {}

  async execute({
    customerId,
  }: GetBusinessCustomersRequest): Promise<GetBusinessCustomersResponse> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new CustomerNotFoundException();
    return { customer };
  }
}
