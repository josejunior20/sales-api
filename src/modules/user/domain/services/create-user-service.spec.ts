import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { CreateUserService } from './create-user-service';

let createUserService: CreateUserService;
let encryptedPassword: FakeHashRepository;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    encryptedPassword = new FakeHashRepository();
    createUserService = new CreateUserService(
      inMemoryUserRepository,
      encryptedPassword,
    );
  });

  it('Should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncryption = 'Teste123';

    const user = await createUserService.execute(
      makeUser({ password: userPasswordWithoutEncryption }),
    );

    const userHasPasswordEncrypted = await encryptedPassword.compareHash(
      userPasswordWithoutEncryption,
      user.user.password,
    );
    expect(userHasPasswordEncrypted).toBeTruthy();
  });

  it('Should be able to throw error when create user with already exist email', () => {
    const user = makeUser();

    inMemoryUserRepository.users = [user];

    expect(
      async () => await createUserService.execute(makeUser()),
    ).rejects.toThrow(UserConflictException);
  });
});
