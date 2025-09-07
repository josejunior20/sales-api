import { User } from '@modules/user/domain/entities/User';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      role: user.roles.toString(),
    };
  }
}
