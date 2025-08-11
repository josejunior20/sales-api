import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

import { AuthController } from './infra/controllers/auth.controller';
import { ValidateUserService } from './services/validade-user.services';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [LocalStrategy, ValidateUserService],
})
export class AuthModule {}
