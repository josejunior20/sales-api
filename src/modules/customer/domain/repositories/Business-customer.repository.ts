import { BusinessCustomer } from '../entities/Business-customer';

export abstract class BusinessCustomerRepository {
  abstract create(customer: BusinessCustomer): Promise<void>;
  abstract save(customer: BusinessCustomer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findById(customerId: string): Promise<BusinessCustomer | null>;
  abstract findAll(): Promise<BusinessCustomer[]>;
  abstract findByCnpj(cnpj: string): Promise<BusinessCustomer | null>;
}
