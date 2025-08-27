import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { GetUserService } from './get-user.service';

let inMemoryUserRepository: InMemoryUserRepository;
let getUserService: GetUserService;

describe('Get User', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserService = new GetUserService(inMemoryUserRepository);
  });

  it('should be able to get user', async () => {
    const user = makeUser();
    const user1 = makeUser();

    inMemoryUserRepository.users = [user, user1];

    await getUserService.execute({ userId: user.id });

    expect(inMemoryUserRepository.users[0]).toEqual(user);
  });

  it('should be able to throw error when not found user', async () => {
    const user = makeUser();

    inMemoryUserRepository.users = [user];

    expect(async () => {
      await getUserService.execute({ userId: ' ' });
    }).rejects.toThrowError(UserNotFoundException);
  });
});
