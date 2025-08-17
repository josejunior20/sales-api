import { Customer } from '../entities/Customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findByEmail(customerId: string): Promise<Customer | null>;
  abstract findById(customerId: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
}
