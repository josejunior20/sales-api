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
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    super(props);

    this.businessCustomerProps = {
      companyName: props.companyName,
      tradeName: props.tradeName,
      cnpj: props.cnpj,
    };
  }

  public get companyName(): string {
    return this.businessCustomerProps.companyName;
  }
  protected updateCompanyName(companyName: string) {
    this.businessCustomerProps.companyName = companyName;
    this.touch();
  }

  public get tradeName(): string {
    return this.businessCustomerProps.tradeName;
  }
  protected updateTradeName(tradeName: string) {
    this.businessCustomerProps.tradeName = tradeName;
    this.touch();
  }

  public get cnpj(): string {
    const cnpj = this.businessCustomerProps.cnpj.replace(/\D/g, ''); // remove tudo que não é número
    if (cnpj.length !== 14) return cnpj; // caso não seja válido, retorna como está

    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    );
  }
}
