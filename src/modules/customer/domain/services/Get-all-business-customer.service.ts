import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';
import { Injectable } from '@nestjs/common';

import { BusinessCustomer } from '../entities/Business-customer';

interface GetAllBusinessCustomerResponse {
  customers: BusinessCustomer[];
}
@Injectable()
export class GetAllBusinessCustomerService {
  constructor(
    private readonly businessCustomerRepository: BusinessCustomerRepository,
  ) {}

  async execute(): Promise<GetAllBusinessCustomerResponse> {
    const customers = await this.businessCustomerRepository.findAll();
    return { customers };
  }
}
