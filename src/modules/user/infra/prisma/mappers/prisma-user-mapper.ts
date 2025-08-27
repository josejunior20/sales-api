import { User, UserRole } from '@modules/user/domain/entities/User';
import { Email } from '@shared/domain/values-objects/email.value-object';
import { User as RawUser } from 'generated/prisma/client';
import { Role as PrismaRole } from 'generated/prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      password: user.password,
      roles: user.roles.map(role => role as PrismaRole),
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      id: raw.id,
      name: raw.name,
      email: new Email(raw.email),
      password: raw.password,
      roles: raw.roles.map(role => role as UserRole),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
