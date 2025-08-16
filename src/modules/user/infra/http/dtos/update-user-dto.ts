import { PartialType } from '@nestjs/swagger';
import { MinLengthCustom } from '@shared/exceptions/decorators/MinLengthCustom';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user-dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @MinLengthCustom(6)
  oldPassword: string;
}
