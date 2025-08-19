import { Replace } from '@shared/helpers/replace';

import { Customer, CustomerProps } from './Customer';

export interface IndividualCustomerProps {
  name: string;
  cpf: string;
}

export class IndividualCustomer extends Customer {
  private individualProps: IndividualCustomerProps;

  constructor(
    props: Replace<
      CustomerProps & IndividualCustomerProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    super(props, id);
    this.individualProps = {
      name: props.name,
      cpf: props.cpf,
    };
  }

  public get name(): string {
    return this.individualProps.name;
  }
  public set name(name: string) {
    this.individualProps.name = name;
    this.update();
  }

  public get cpf(): string {
    return this.individualProps.cpf;
  }
  public set cpf(cpf: string) {
    this.individualProps.cpf = cpf;
    this.update();
  }
}
