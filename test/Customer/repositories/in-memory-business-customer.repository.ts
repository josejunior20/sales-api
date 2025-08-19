import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { Customer } from '@modules/customer/domain/entities/Customer';
import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';

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

  async findAll(): Promise<BusinessCustomer[]> {
    return this.customers;
  }

  async findByCnpj(cnpj: string): Promise<BusinessCustomer | null> {
    const customer = this.customers.find(data => data.cnpj === cnpj);
    return (customer as BusinessCustomer) ?? null;
  }
}
