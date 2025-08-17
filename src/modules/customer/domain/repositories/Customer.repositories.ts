import { Customer } from '../entities/Customer';
import { IndividualCustomer } from '../entities/Individual-customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findByCpf(cpf: string): Promise<IndividualCustomer | null>;
  abstract findById(customerId: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
}
