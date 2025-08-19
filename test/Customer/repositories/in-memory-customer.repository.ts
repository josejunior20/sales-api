import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { Customer } from '@modules/customer/domain/entities/Customer';
import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
import { CustomerRepository } from '@modules/customer/domain/repositories/Customer.repositories';

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: Customer): Promise<void> {
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

  async findById(customerId: string): Promise<Customer | null> {
    return this.customers.find(data => data.id === customerId) ?? null;
  }

  async findAll(): Promise<Customer[]> {
    return this.customers;
  }

  async findByCpf(cpf: string): Promise<IndividualCustomer | null> {
    const customer = this.customers.find(
      data => data instanceof IndividualCustomer && data.cpf === cpf,
    );
    return (customer as IndividualCustomer) ?? null;
  }

  async findByCnpj(cnpj: string): Promise<BusinessCustomer | null> {
    const customer = this.customers.find(
      data => data instanceof BusinessCustomer && data.cnpj === cnpj,
    );
    return (customer as BusinessCustomer) ?? null;
  }
}
