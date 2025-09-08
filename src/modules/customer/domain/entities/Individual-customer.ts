import { InvalidCustomerNameException } from '@modules/customer/exceptions/Invalid-customer-name.exception';
import { Cpf } from '@shared/domain/values-objects/cpf.value-object';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';
import { Replace } from '@shared/helpers/replace';

import { UpdateIndividualCustomerRequest } from '../services/update-individual-customer.service';
import { Customer, CustomerProps } from './Customer';

export interface IndividualCustomerProps {
  name: string;
  cpf: Cpf;
}

export class IndividualCustomer extends Customer {
  private individualProps: IndividualCustomerProps;

  constructor(
    props: Replace<
      CustomerProps & IndividualCustomerProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    super(props);
    this.individualProps = {
      name: props.name,
      cpf: props.cpf,
    };
  }

  public get name(): string {
    return this.individualProps.name;
  }
  protected updateName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new InvalidCustomerNameException();
    }
    this.individualProps.name = name;
  }

  public get cpf(): Cpf {
    return this.individualProps.cpf;
  }

  public updateProfile(
    props: Partial<Omit<UpdateIndividualCustomerRequest, 'customerId'>>,
  ): void {
    if (props.name !== undefined) this.updateName(props.name);
    if (props.email !== undefined) this.updateEmail(new Email(props.email));
    if (props.phone !== undefined) this.updatePhone(new Phone(props.phone));
    if (props.address !== undefined) this.updateAddress(props.address);
  }
}
