import { User } from '@modules/user/domain/entities/User';
import { Request } from 'express';

export class AuthRequestModel extends Request {
  user: User;
}
