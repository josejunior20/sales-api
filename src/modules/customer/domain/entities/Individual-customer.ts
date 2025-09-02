import { InvalidCustomerNameException } from '@modules/customer/exceptions/Invalid-customer-name.exception';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';
import { Replace } from '@shared/helpers/replace';

import { UpdateIndividualCustomerRequest } from '../services/update-individual-customer.service';
import { Customer, CustomerProps } from './Customer';

export interface IndividualCustomerProps {
  name: string;
  readonly cpf: string;
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

  public get cpf(): string {
    return this.individualProps.cpf;
  }

  public updateProfile(
    props: Partial<Pick<UpdateIndividualCustomerRequest, 'customerId'>> &
      Omit<UpdateIndividualCustomerRequest, 'customerId'>,
  ): void {
    this.updateName(props.name);
    this.updateEmail(new Email(props.email));
    this.updatePhone(new Phone(props.phone));
    this.updateAddress(props.address);
  }
}
