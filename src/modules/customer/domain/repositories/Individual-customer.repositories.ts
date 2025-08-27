import { IndividualCustomer } from '../entities/Individual-customer';

export abstract class IndividualCustomerRepository {
  abstract create(customer: IndividualCustomer): Promise<void>;
  abstract save(customer: IndividualCustomer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findById(customerId: string): Promise<IndividualCustomer | null>;
  abstract findAll(): Promise<IndividualCustomer[]>;
  abstract findByCpf(cpf: string): Promise<IndividualCustomer | null>;
}
