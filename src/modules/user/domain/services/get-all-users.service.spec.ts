import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { GetAllUsersService } from './get-all-users.service';

let getAllUsersService: GetAllUsersService;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Get all users', () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getAllUsersService = new GetAllUsersService(inMemoryUserRepository);
  });

  it('should return all users from repository', async () => {
    const user1 = makeUser();
    const user2 = makeUser();
    const user3 = makeUser();
    inMemoryUserRepository.users = [user1, user2, user3];

    const { users } = await getAllUsersService.execute();

    expect(users).toHaveLength(3);
    expect(users).toEqual(expect.arrayContaining([user1, user2, user3]));
  });

  it('Should return an empty array if no users are found', async () => {
    const { users } = await getAllUsersService.execute();

    expect(users).toHaveLength(0);
    expect(users).toEqual([]);
  });
});
