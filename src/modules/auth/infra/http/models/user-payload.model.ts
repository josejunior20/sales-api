import { Email } from '@shared/domain/values-objects/email.value-object';

export interface UserPayload {
  email: Email;
  sub: string;
  name: string;
  createdAt: string;
}
