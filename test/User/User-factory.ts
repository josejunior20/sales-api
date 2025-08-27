import { User, UserProps, UserRole } from '@modules/user/domain/entities/User';
import { Email } from '@shared/domain/values-objects/email.value-object';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'John Doe',
    email: new Email('johndoe@mail.com'),
    password: 'test123',
    roles: [UserRole.USER],
    ...override,
  });
}
