import { User } from '@modules/user/domain/entities/User';
import { UserRepository } from '@modules/user/domain/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user ?? null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find(user => user.id === userId);

    return user ?? null;
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex(data => data.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    }
  }
  async delete(userId: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== userId);
  }
}
