import { User, UserProps, UserRole } from '@modules/user/domain/entities/User';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'test123',
    roles: [UserRole.USER],
    ...override,
  });
}
