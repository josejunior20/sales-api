import { Injectable } from '@nestjs/common';

import { IndividualCustomer } from '../entities/Individual-customer';
import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

interface GetAllIndividualCustomersResponse {
  customers: IndividualCustomer[];
}

@Injectable()
export class GetAllIndividualCustomerService {
  constructor(
    private readonly customerRepository: IndividualCustomerRepository,
  ) {}

  async execute(): Promise<GetAllIndividualCustomersResponse> {
    const customers = await this.customerRepository.findAll();
    return { customers };
  }
}
