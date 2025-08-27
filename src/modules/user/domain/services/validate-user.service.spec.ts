import { AuthIncorrectExceptions } from '@modules/user/exceptions/auth-incorrect-exception';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { ValidateUserService } from './validade-user.service';

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
    const userPasswordEncryption = '123Test';
    const user = makeUser({
      password: await encryptedPassword.generateHash(userPasswordEncryption),
    });
    inMemoryUserRepository.users = [user];

    const result = await validateUserService.execute({
      email: user.email,
      password: userPasswordEncryption,
    });
    expect(result.user).toEqual(user);
  });

  it('should be able to throw error when credentials incorrect', async () => {
    const userPasswordEncryption = '123Test';
    const user = makeUser({
      password: await encryptedPassword.generateHash(userPasswordEncryption),
    });
    inMemoryUserRepository.users = [user];

    await expect(
      validateUserService.execute({
        email: new Email('incorrect@email.com'),
        password: userPasswordEncryption,
      }),
    ).rejects.toThrow(AuthIncorrectExceptions);

    await expect(
      validateUserService.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toThrow(AuthIncorrectExceptions);
  });
});
