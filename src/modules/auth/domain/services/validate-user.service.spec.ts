import { AuthIncorrectExceptions } from '@modules/user/exceptions/auth-incorrect-exception';
import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { ValidateUserService } from './validate-user.service';

let validateUserService: ValidateUserService;
let inMemoryUserRepository: InMemoryUserRepository;
let encryptedPassword: FakeHashRepository;

describe('Validate User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    encryptedPassword = new FakeHashRepository();
    validateUserService = new ValidateUserService(
      inMemoryUserRepository,
      encryptedPassword,
    );
  });

  it('should be able to return user when credentials are correct', async () => {
    const plaintextPassword = 'Teste123';

    const encrypted = await encryptedPassword.generateHash(plaintextPassword);

    const user = makeUser({ password: encrypted });
    inMemoryUserRepository.users = [user];

    const result = await validateUserService.execute({
      email: user.email,
      password: plaintextPassword,
    });

    expect(result).toEqual({ user });
  });

  it('should throw error when email is incorrect', async () => {
    const user = makeUser({
      password: await encryptedPassword.generateHash('Teste123'),
    });
    inMemoryUserRepository.users = [user];

    await expect(
      validateUserService.execute({
        email: new Email('invalid@example.com'),
        password: 'Teste123',
      }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should throw error when password is incorrect', async () => {
    const user = makeUser({
      password: await encryptedPassword.generateHash('Teste123'),
    });
    inMemoryUserRepository.users = [user];

    await expect(
      validateUserService.execute({
        email: user.email,
        password: 'WrongPassword',
      }),
    ).rejects.toThrow(AuthIncorrectExceptions);
  });
});
