import { Replace } from '@shared/helpers/replace';
import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export class User {
  private _id: string;
  private userProps: UserProps;

  constructor(
    userProps: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.userProps = {
      ...userProps,
      createdAt: userProps.createdAt ?? new Date(),
      updatedAt: userProps.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.userProps.name;
  }
  public set name(name: string) {
    this.userProps.name = name;
  }

  public get email(): string {
    return this.userProps.email;
  }
  public set email(email: string) {
    this.userProps.email = email;
  }

  public get password(): string {
    return this.userProps.password;
  }
  public set password(password: string) {
    this.userProps.password = password;
  }

  public get createddAt(): Date {
    return this.userProps.createdAt;
  }

  public get updatedAt(): Date {
    return this.userProps.updatedAt;
  }
  public set updatedAt(updatedAt: Date) {
    this.userProps.updatedAt = updatedAt;
  }
}
