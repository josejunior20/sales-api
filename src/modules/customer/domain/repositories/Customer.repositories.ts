import { BusinessCustomer } from '../entities/Business-customer';
import { Customer } from '../entities/Customer';
import { IndividualCustomer } from '../entities/Individual-customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findById(customerId: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
  abstract findByCpf(cpf: string): Promise<IndividualCustomer | null>;
  abstract findByCnpj(cnpj: string): Promise<BusinessCustomer | null>;
}
