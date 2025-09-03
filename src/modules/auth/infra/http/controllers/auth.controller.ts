import { SignInService } from '@modules/auth/domain/services/sign-in.service';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { Public } from '../../decorators/isPublic';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequestModel } from '../models/auth-request.model';

@Controller('auth')
export class AuthController {
  constructor(private sigInService: SignInService) {}

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const accessToken = await this.sigInService.execute({ user: request.user });

    return { accessToken };
  }
}
