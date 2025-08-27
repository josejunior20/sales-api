import { RemoveRoleExceptions } from '@modules/user/exceptions/remove-role.exception';
import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/Base.entity';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { Replace } from '@shared/helpers/replace';

import { UpdateUserRequest } from '../services/update-user.service';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserProps {
  name: string;
  email: Email;
  password: string;
  roles?: UserRole[];
}
export class User extends BaseEntity {
  private userProps: UserProps;

  constructor(
    props: Replace<
      UserProps & BaseEntityProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    super(props);
    this.userProps = {
      ...props,
      roles: props.roles ?? [UserRole.USER],
    };
  }

  public get name(): string {
    return this.userProps.name;
  }
  protected updateName(name: string): void {
    this.userProps.name = name;
    this.touch();
  }

  public get email(): Email {
    return this.userProps.email;
  }
  protected updatedEmail(email: Email): void {
    this.userProps.email = email;
    this.touch();
  }

  public get password(): string {
    return this.userProps.password;
  }
  protected updatePassword(password: string): void {
    this.userProps.password = password;
    this.touch();
  }

  public get roles(): UserRole[] {
    return this.userProps.roles;
  }

  public addRole(role: UserRole): void {
    if (!this.userProps.roles.includes(role)) {
      this.userProps.roles.push(role);
      this.touch();
    }
  }
  public setRoles(roles: UserRole[]): void {
    this.userProps.roles = roles;
    this.touch();
  }

  public removeRole(role: UserRole): void {
    if (role === UserRole.USER) {
      throw new RemoveRoleExceptions();
    }
    this.userProps.roles = this.userProps.roles.filter(r => r !== role);
    this.touch();
  }

  public hasRole(role: UserRole): boolean {
    return this.userProps.roles.includes(role);
  }

  public updateProfile(
    props: Partial<Pick<UpdateUserRequest, 'userId'>> &
      Omit<UpdateUserRequest, 'userId'>,
  ): void {
    if (props.name !== undefined) {
      this.updateName(props.name);
    }
    if (props.email !== undefined) {
      this.updatedEmail(props.email);
    }
    if (props.password !== undefined) {
      this.updatePassword(props.password);
    }
  }
}
