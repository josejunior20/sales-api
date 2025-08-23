import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/Base.entity';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Phone } from '@shared/domain/values-objects/Phone.value-object';
import { Replace } from '@shared/helpers/replace';

export interface CustomerProps {
  email: Email;
  phone: Phone;
  address: string;
}
export abstract class Customer extends BaseEntity {
  private customerProps: CustomerProps;

  constructor(
    customerProps: Replace<
      CustomerProps & BaseEntityProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    super({
      id: customerProps.id,
      createdAt: customerProps.createdAt,
      updatedAt: customerProps.updatedAt,
    });
    this.customerProps = { ...customerProps };
  }

  public get email(): Email {
    return this.customerProps.email;
  }

  public get phone(): Phone {
    return this.customerProps.phone;
  }

  public get address(): string {
    return this.customerProps.address;
  }

  protected updateEmail(email: Email): void {
    this.customerProps.email = email;
    this.touch();
  }

  protected updatePhone(phone: Phone): void {
    this.customerProps.phone = phone;
    this.touch();
  }

  protected updateAddress(address: string): void {
    this.customerProps.address = address;
    this.touch();
  }
}
