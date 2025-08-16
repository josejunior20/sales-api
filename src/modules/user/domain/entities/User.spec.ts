import { makeUser } from '@test/User/User-factory';

import { UserRole } from './User';

describe('User entity', () => {
  it('should be able to create a user', () => {
    const user = makeUser();

    expect(user).toBeTruthy();
  });

  it('should generate a unique id if not provided', () => {
    const user = makeUser();

    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
  });

  it('should create a user with correct properties', () => {
    const user = makeUser({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'securepassword',
      roles: [UserRole.ADMIN],
    });

    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.password).toBe('securepassword');
    expect(user.roles).toContain(UserRole.ADMIN);
  });

  it('should correctly check user roles', () => {
    const user = makeUser({ roles: [UserRole.USER] });

    expect(user.hasRole(UserRole.USER)).toBe(true);
    expect(user.hasRole(UserRole.ADMIN)).toBe(false);
  });

  it('should allow updating user properties', () => {
    const user = makeUser();

    user.name = 'Updated Name';
    user.email = 'updated@example.com';

    expect(user.name).toBe('Updated Name');
    expect(user.email).toBe('updated@example.com');
  });
});
