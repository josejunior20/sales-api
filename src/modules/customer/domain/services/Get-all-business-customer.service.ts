import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';
import { Injectable } from '@nestjs/common';

import { BusinessCustomer } from '../entities/Business-customer';

interface GetAllBusinessCustomerResponse {
  customers: BusinessCustomer[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
@Injectable()
export class GetAllBusinessCustomerService {
  constructor(
    private readonly businessCustomerRepository: BusinessCustomerRepository,
  ) {}

  async execute(page = 1, limit = 10): Promise<GetAllBusinessCustomerResponse> {
    const customer = await this.businessCustomerRepository.findAll(page, limit);
    return { customers: customer.data, ...customer };
  }
}
