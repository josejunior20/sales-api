import { UserModule } from '@modules/user/user.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SignInService } from './domain/services/sign-in.service';
import { ValidateUserService } from './domain/services/validate-user.service';
import { JwtStrategy } from './domain/strategies/jwt.strategy';
import { LocalStrategy } from './domain/strategies/local.strategy';
import { AuthController } from './infra/http/controllers/auth.controller';
import { SignInValidateMiddleware } from './infra/http/middlewares/sign-in-validate.middleware';
@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, ValidateUserService, SignInService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInValidateMiddleware).forRoutes('sign-in');
  }
}
