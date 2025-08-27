import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { UserRole } from '../entities/User';
import { SetUserRoleService } from './set-user-role.service';

let setUserRoleService: SetUserRoleService;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Set User Role', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    setUserRoleService = new SetUserRoleService(inMemoryUserRepository);
  });

  it('should be able to set user roles', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const newRoles = [UserRole.ADMIN];

    const response = await setUserRoleService.execute({
      userId: user.id,
      role: newRoles,
    });

    expect(response.user.roles).toEqual(newRoles);
    expect(response.user.hasRole(UserRole.ADMIN)).toBe(true);
  });

  it('should throw UserNotFoundException if user does not exist', async () => {
    await expect(
      setUserRoleService.execute({
        userId: 'non-existent-id',
        role: [UserRole.ADMIN],
      }),
    ).rejects.toThrow(UserNotFoundException);
  });
});
