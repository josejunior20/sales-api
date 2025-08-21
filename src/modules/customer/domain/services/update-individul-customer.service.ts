import { CustomerNotFoundException } from '@modules/customer/exceptions/customer-not-found.exceptions';

import { IndividualCustomer } from '../entities/Individual-customer';
import { IndividualCustomerRepository } from '../repositories/Individual-customer.repositories';

interface UpdateIndividualCustomerRequest {
  customerId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
}

interface UpdateIndividualCustomerResponse {
  customer: IndividualCustomer;
}
export class UpdateIndividualCustomerService {
  constructor(
    private readonly individualCustomerRepository: IndividualCustomerRepository,
  ) {}

  async execute({
    customerId,
    name,
    cpf,
    email,
    phone,
    address,
  }: UpdateIndividualCustomerRequest): Promise<UpdateIndividualCustomerResponse> {
    const customer = await this.individualCustomerRepository.findById(
      customerId,
    );
    if (!customer) throw new CustomerNotFoundException();

    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;

    await this.individualCustomerRepository.save(customer);
    return { customer };
  }
}
