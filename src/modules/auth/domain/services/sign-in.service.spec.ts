import { UserPayload } from '@modules/auth/infra/http/models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from '@test/User/User-factory';

import { SignInService } from './sign-in.service';

let signInService: SignInService;
let jwtService: JwtService;

describe('sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInService = new SignInService(jwtService);
  });

  it('Should create a valid access token with correct payload', async () => {
    const user = makeUser({});
    const token = await signInService.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toBe(user.id);
    expect(payload.email).toBe(user.email);
    expect(payload.name).toBe(user.name);
    expect(payload.createdAt).toBe(user.createdAt.toJSON());
  });

  it('Should be able to create valid access token', async () => {
    const user = makeUser({});

    const token = await signInService.execute({ user });
    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
