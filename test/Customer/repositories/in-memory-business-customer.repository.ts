import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { Customer } from '@modules/customer/domain/entities/Customer';
import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

export class InMemoryBusinessCustomerRepository
  implements BusinessCustomerRepository
{
  public customers: BusinessCustomer[] = [];

  async create(customer: BusinessCustomer): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: BusinessCustomer): Promise<void> {
    const index = this.customers.findIndex(data => data.id === customer.id);
    if (index >= 0) {
      this.customers[index] = customer;
    }
  }

  async delete(customerId: string): Promise<void> {
    this.customers = this.customers.filter(
      customer => customer.id !== customerId,
    );
  }

  async findById(customerId: string): Promise<BusinessCustomer | null> {
    const customer = this.customers.find(
      data => data instanceof Customer && data.id === customerId,
    );
    return (customer as BusinessCustomer) ?? null;
  }

  async findByCnpj(cnpj: string): Promise<BusinessCustomer | null> {
    const customer = this.customers.find(data => data.cnpj === cnpj);
    return (customer as BusinessCustomer) ?? null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<BusinessCustomer>> {
    const total = this.customers.length;
    const lastPage = total === 0 ? 1 : Math.ceil(total / limit);
    const data = this.customers.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, lastPage };
  }
}
