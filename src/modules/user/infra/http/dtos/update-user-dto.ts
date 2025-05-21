import { PartialType } from '@nestjs/swagger';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsUuidCustom } from '@shared/exceptions/decorators/IsUuidCustom';
import { MinLengthCustom } from '@shared/exceptions/decorators/MinLengthCustom';

import { CreateUserDto } from './create-user-dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmptyCustom()
  @IsUuidCustom()
  userId: string;

  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  oldPassword: string;
}
