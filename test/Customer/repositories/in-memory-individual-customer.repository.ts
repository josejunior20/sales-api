import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
import { IndividualCustomerRepository } from '@modules/customer/domain/repositories/Individual-customer.repositories';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

export class InMemoryIndividualCustomerRepository
  implements IndividualCustomerRepository
{
  public customers: IndividualCustomer[] = [];

  async create(customer: IndividualCustomer): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: IndividualCustomer): Promise<void> {
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

  async findById(customerId: string): Promise<IndividualCustomer | null> {
    const customer = this.customers.find(data => data.id === customerId);
    return (customer as IndividualCustomer) ?? null;
  }

  async findByEmail(email: string): Promise<IndividualCustomer | null> {
    const customer = this.customers.find(
      data => data.email.getValue() === email,
    );
    return (customer as IndividualCustomer) ?? null;
  }

  async findByCpf(cpf: string): Promise<IndividualCustomer | null> {
    const customer = this.customers.find(data => data.cpf.getValue() === cpf);
    return (customer as IndividualCustomer) ?? null;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<IndividualCustomer>> {
    const total = this.customers.length;
    const lastPage = total === 0 ? 1 : Math.ceil(total / limit);
    const data = this.customers.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, lastPage };
  }
}
