import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('signIn')
export class AuthController {
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: any) {
    return request.user;
  }
}
