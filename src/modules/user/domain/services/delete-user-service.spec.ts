import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { DeleteUserService } from './delete-user-service';

let inMemoryUserRepository: InMemoryUserRepository;
let deleteUserService: DeleteUserService;

describe('Delete user', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteUserService = new DeleteUserService(inMemoryUserRepository);
  });

  it('should be able to update user', async () => {
    const user = makeUser();

    inMemoryUserRepository.users = [user];

    await deleteUserService.execute({ userId: user.id });

    expect(inMemoryUserRepository.users).toHaveLength(0);
  });

  it('should be able to throw error when not found user', async () => {
    const user = makeUser();
    inMemoryUserRepository.users = [user];

    expect(async () => {
      await deleteUserService.execute({ userId: '' });
    }).rejects.toThrowError(UserNotFoundException);
  });
});
