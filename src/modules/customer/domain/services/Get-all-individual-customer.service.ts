import { Injectable } from '@nestjs/common';

import { IndividualCustomer } from '../entities/Individual-customer';
import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

interface GetAllIndividualCustomersResponse {
  customers: IndividualCustomer[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

@Injectable()
export class GetAllIndividualCustomerService {
  constructor(
    private readonly customerRepository: IndividualCustomerRepository,
  ) {}

  async execute(
    page = 1,
    limit = 10,
  ): Promise<GetAllIndividualCustomersResponse> {
    const customer = await this.customerRepository.findAll(page, limit);
    return { customers: customer.data, ...customer };
  }
}
