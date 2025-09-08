import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

import { IndividualCustomer } from '../entities/Individual-customer';

export abstract class IndividualCustomerRepository {
  abstract create(customer: IndividualCustomer): Promise<void>;
  abstract save(customer: IndividualCustomer): Promise<void>;
  abstract delete(customerId: string): Promise<void>;
  abstract findById(customerId: string): Promise<IndividualCustomer | null>;
  abstract findByEmail(email: string): Promise<IndividualCustomer | null>;
  abstract findByCpf(cpf: string): Promise<IndividualCustomer | null>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<IndividualCustomer>>;
}
