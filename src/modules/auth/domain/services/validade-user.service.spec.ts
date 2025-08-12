import { ValidateUserService } from '@modules/user/domain/services/validade-user-service';
import { AuthIncorrectExceptions } from '@modules/user/exceptions/auth-incorrect-exception';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

let validateUserService: ValidateUserService;
let inMemoryUserRepository: InMemoryUserRepository;
let encryptedPassword: FakeHashRepository;

describe('Validade User', () => {
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
        email: 'invalid@example.com',
        password: 'Teste123',
      }),
    ).rejects.toThrow(AuthIncorrectExceptions);
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
