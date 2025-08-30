import { UserConflictException } from '@modules/user/exceptions/user-conflict-exception';
import { UserNotFoundException } from '@modules/user/exceptions/user-not-found-exception';
import { UserPasswordNotMatchException } from '@modules/user/exceptions/user-password-not-match-exception';
import { UserPasswordRequiredException } from '@modules/user/exceptions/user-password-required-exception';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { FakeHashRepository } from '@test/User/fake-hash-repository/fake-hash-repository';
import { InMemoryUserRepository } from '@test/User/repositories/in-memory-user-repository';
import { makeUser } from '@test/User/User-factory';

import { UpdateUserService } from './update-user.service';

let updateUserService: UpdateUserService;
let inMemoryUserRepository: InMemoryUserRepository;
let hashPassword: FakeHashRepository;

describe('Update a user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashPassword = new FakeHashRepository();
    updateUserService = new UpdateUserService(
      inMemoryUserRepository,
      hashPassword,
    );
  });

  it('Should be able to update user', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const user = makeUser({
      password: await hashPassword.generateHash(userPasswordWithoutEncryption),
    });
    inMemoryUserRepository.users = [user];

    const userUpdate = await updateUserService.execute({
      userId: user.id,
      name: 'teste',
      email: user.email.getValue(),
      oldPassword: 'Teste123',
      password: '123Test',
    });

    expect(inMemoryUserRepository.users).toHaveLength(1);
    expect(inMemoryUserRepository.users[0]).toEqual(userUpdate.user);
  });

  it('Should throw if user is not found', async () => {
    await expect(
      updateUserService.execute({
        userId: 'non-existent-id',
        name: 'teste',
        email: 'email@example.com',
        oldPassword: '123',
        password: '456',
      }),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('Should be able to check if email is already in use by another user', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const user1 = makeUser({
      email: new Email('email@example.com'),
      password: await hashPassword.generateHash(userPasswordWithoutEncryption),
    });
    const user2 = makeUser({
      email: new Email('email02@example.com'),
      password: await hashPassword.generateHash(userPasswordWithoutEncryption),
    });
    inMemoryUserRepository.users = [user1, user2];

    await expect(
      updateUserService.execute({
        userId: user1.id,
        name: 'teste',
        email: user2.email.getValue(),
        oldPassword: 'Teste123',
        password: '123Test',
      }),
    ).rejects.toThrow(UserConflictException);
  });

  it('Should be able to check if old password is empty', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const user = makeUser({
      password: await hashPassword.generateHash(userPasswordWithoutEncryption),
    });
    inMemoryUserRepository.users = [user];
    await expect(
      updateUserService.execute({
        userId: user.id,
        name: 'teste',
        email: 'email@example.com',
        oldPassword: '',
        password: '123Test',
      }),
    ).rejects.toThrow(UserPasswordRequiredException);
  });

  it('Should be able to check if old password is the same as a password', async () => {
    const userPasswordWithoutEncryption = 'Teste123';
    const user = makeUser({
      password: await hashPassword.generateHash(userPasswordWithoutEncryption),
    });
    inMemoryUserRepository.users = [user];
    await expect(
      updateUserService.execute({
        userId: user.id,
        name: 'teste',
        email: 'email@example.com',
        oldPassword: 'wrongPassword',
        password: '123Test',
      }),
    ).rejects.toThrow(UserPasswordNotMatchException);
  });
});
