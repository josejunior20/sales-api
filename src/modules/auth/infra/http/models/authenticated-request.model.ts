import { Email } from '@shared/domain/values-objects/email.value-object';
import { Request } from 'express';

export class AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    email: Email;
    name: string;
    createdAt: string;
  };
}
