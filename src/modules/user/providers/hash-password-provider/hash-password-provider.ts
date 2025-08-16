import { HashPasswordRepository } from '@modules/user/domain/repositories/hash-password-repository';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class HashPasswordProvider implements HashPasswordRepository {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 10);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
