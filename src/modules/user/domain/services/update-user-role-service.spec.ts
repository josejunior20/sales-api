import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { UserRole } from '../entities/User';
import { UpdateUserRoleService } from './update-user-role-service';

let updateUserRoleService: UpdateUserRoleService;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Update User Role', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    updateUserRoleService = new UpdateUserRoleService(inMemoryUserRepository);
  });

  it('should be able to update user roles', async () => {
    const user = makeUser(); // Cria um usuário com role USER por padrão
    await inMemoryUserRepository.create(user);

    const newRoles = [UserRole.ADMIN];

    const response = await updateUserRoleService.execute({
      userId: user.id,
      roles: newRoles,
    });

    expect(response.user.roles).toEqual(newRoles);
    expect(response.user.hasRole(UserRole.ADMIN)).toBe(true);
  });

  it('should throw UserNotFoundException if user does not exist', async () => {
    await expect(
      updateUserRoleService.execute({
        userId: 'non-existent-id',
        roles: [UserRole.ADMIN],
      }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should update the updatedAt date when roles are set', async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const oldUpdatedAt = user.updatedAt;

    await new Promise(res => setTimeout(res, 10));

    const response = await updateUserRoleService.execute({
      userId: user.id,
      roles: [UserRole.ADMIN],
    });

    expect(response.user.updatedAt.getTime()).toBeGreaterThan(
      oldUpdatedAt.getTime(),
    );
  });
});
