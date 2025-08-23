import { Replace } from '@shared/helpers/replace';
import { randomUUID } from 'crypto';

export interface BaseEntityProps {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
export abstract class BaseEntity {
  protected readonly props: BaseEntityProps;

  constructor(
    props: Replace<
      BaseEntityProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    this.props = {
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }
}
