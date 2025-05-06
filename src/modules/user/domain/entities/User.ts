import { Replace } from '@shared/helpers/replace';
import { randomUUID } from 'crypto';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProps {
  name: string;
  email: string;
  password: string;
  roles?: UserRole[];
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
      roles: userProps.roles ?? [UserRole.USER],
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

  public get roles(): UserRole[] {
    return this.userProps.roles;
  }
  public set roles(roles: UserRole[]) {
    this.userProps.roles = roles;
  }

  public hasRole(role: UserRole): boolean {
    return this.userProps.roles.includes(role);
  }

  public get createdAt(): Date {
    return this.userProps.createdAt;
  }

  public get updatedAt(): Date {
    return this.userProps.updatedAt;
  }
  public set updatedAt(updatedAt: Date) {
    this.userProps.updatedAt = updatedAt;
  }
}
