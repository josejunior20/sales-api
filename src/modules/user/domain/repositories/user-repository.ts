import { Email } from '@shared/domain/values-objects/email.value-object';

import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract delete(userId: string): Promise<void>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
