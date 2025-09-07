import { RemoveRoleExceptions } from '@modules/user/exceptions/remove-role.exception';
import { Email } from '@shared/domain/values-objects/email.value-object';
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
      name: 'Testando',
      email: new Email('testando@example.com'),
      password: 'securePassword',
      roles: [UserRole.ADMIN],
    });

    expect(user.name).toBe('Testando');
    expect(user.email.getValue()).toBe('testando@example.com');
    expect(user.password).toBe('securePassword');
    expect(user.roles).toContain(UserRole.ADMIN);
  });

  it('should correctly check user roles', () => {
    const user = makeUser({ roles: [UserRole.USER] });

    expect(user.hasRole(UserRole.USER)).toBe(true);
    expect(user.hasRole(UserRole.ADMIN)).toBe(false);
  });

  it('should allow updating user properties', () => {
    const user = makeUser();
    const oldUpdatedAt = user.updatedAt;

    user.updateProfile({ name: 'Updated Name' });
    // user.updateProfile({ email: new Email('updated@example.com') });
    user.updateProfile({ password: 'newPass123' });

    expect(user.name).toBe('Updated Name');
    // expect(user.email.getValue()).toBe('updated@example.com');
    expect(user.password).toBe('newPass123');
    expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(
      oldUpdatedAt.getTime(),
    );
  });

  it('should add a new role if not already present', () => {
    const user = makeUser({ roles: [UserRole.USER] });
    const oldUpdatedAt = user.updatedAt;

    user.addRole(UserRole.ADMIN);

    expect(user.roles).toContain(UserRole.ADMIN);
    expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(
      oldUpdatedAt.getTime(),
    );
  });

  it('should not duplicate roles when adding the same role again', () => {
    const user = makeUser({ roles: [UserRole.ADMIN] });

    user.addRole(UserRole.ADMIN);

    expect(user.roles.filter(r => r === UserRole.ADMIN)).toHaveLength(1);
  });

  it('should remove a role if it is not USER', () => {
    const user = makeUser({ roles: [UserRole.ADMIN, UserRole.USER] });

    user.removeRole(UserRole.ADMIN);

    expect(user.roles).not.toContain(UserRole.ADMIN);
    expect(user.roles).toContain(UserRole.USER);
  });

  it('should throw an exception when trying to remove USER role', () => {
    const user = makeUser({ roles: [UserRole.USER] });

    expect(() => user.removeRole(UserRole.USER)).toThrow(RemoveRoleExceptions);
  });
});
