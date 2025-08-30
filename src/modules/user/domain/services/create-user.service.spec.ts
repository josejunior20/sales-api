import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { CreateUserService } from './create-user.service';

let createUserService: CreateUserService;
let inMemoryUserRepository: InMemoryUserRepository;
let fakeHashRepository: FakeHashRepository;

describe('CreateUserService', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    fakeHashRepository = new FakeHashRepository();
    createUserService = new CreateUserService(
      inMemoryUserRepository,
      fakeHashRepository,
    );
  });

  it('Should be able to create user with password encrypted', async () => {
    const plainPassword = 'Teste123';

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: plainPassword,
    });

    const isPasswordEncrypted = await fakeHashRepository.compareHash(
      plainPassword,
      user.password,
    );

    expect(isPasswordEncrypted).toBe(true);
  });

  it('Should throw error when creating user with an already existing email', async () => {
    const user = makeUser();
    inMemoryUserRepository.users.push(user);

    const newUser = {
      name: 'Jane Doe',
      email: 'johndoe@mail.com',
      password: 'AnotherPass123',
    };

    await expect(createUserService.execute(newUser)).rejects.toThrow(
      UserConflictException,
    );
  });
});
