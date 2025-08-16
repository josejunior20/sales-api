import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { ShowAllUsersService } from './show-all-users-service';

let showAllUsersService: ShowAllUsersService;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Show all users', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    showAllUsersService = new ShowAllUsersService(inMemoryUserRepository);
  });

  it('Should be able to get many users', async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const user3 = makeUser();
    inMemoryUserRepository.users = [user1, user2, user3];

    const { users } = await showAllUsersService.execute();

    expect(users).toHaveLength(3);
    expect(inMemoryUserRepository.users).toEqual(users);
  });

  it('Should return an empty array if no users are found', async () => {
    const { users } = await showAllUsersService.execute();

    expect(users).toHaveLength(0);
    expect(users).toEqual([]);
  });
});
