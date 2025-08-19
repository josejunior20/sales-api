import { Replace } from '@shared/helpers/replace';

import { Customer, CustomerProps } from './Customer';

export interface BusinessCustomerProps {
  companyName: string;
  tradeName: string;
  cnpj: string;
}

export class BusinessCustomer extends Customer {
  private businessCustomerProps: BusinessCustomerProps;

  constructor(
    props: Replace<
      BusinessCustomerProps & CustomerProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    super(props, id);

    this.businessCustomerProps = {
      companyName: props.companyName,
      tradeName: props.tradeName,
      cnpj: props.cnpj,
    };
  }

  public get companyName(): string {
    return this.businessCustomerProps.companyName;
  }
  public set companyName(companyName: string) {
    this.businessCustomerProps.companyName = companyName;
    this.update();
  }

  public get tradeName(): string {
    return this.businessCustomerProps.tradeName;
  }
  public set tradeName(tradeName: string) {
    this.businessCustomerProps.tradeName = tradeName;
    this.update();
  }

  public get cnpj(): string {
    return this.businessCustomerProps.cnpj;
  }
  public set cnpj(cnpj: string) {
    this.businessCustomerProps.cnpj = cnpj;
    this.update();
  }
}
