import { Replace } from '@shared/helpers/replace';
import { randomUUID } from 'crypto';

export interface CustomerProps {
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
export abstract class Customer {
  private _id: string;
  private customerProps: CustomerProps;

  constructor(
    customerProps: Replace<
      CustomerProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.customerProps = {
      ...customerProps,
      createdAt: customerProps.createdAt ?? new Date(),
      updatedAt: customerProps.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.customerProps.email;
  }
  public set email(email: string) {
    this.customerProps.email = email;
    this.update();
  }

  public get phone(): string {
    return this.customerProps.phone;
  }
  public set phone(phone: string) {
    this.customerProps.phone = phone;
    this.update();
  }

  public get address(): string {
    return this.customerProps.address;
  }
  public set address(address: string) {
    this.customerProps.address = address;
    this.update();
  }

  public get createdAt(): Date {
    return this.customerProps.createdAt;
  }

  public get updatedAt(): Date {
    return this.customerProps.updatedAt;
  }
  public update() {
    this.customerProps.updatedAt = new Date();
  }
}
