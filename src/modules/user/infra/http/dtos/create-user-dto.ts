import { IsEmailCustom } from '@shared/exceptions/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';
import { MinLengthCustom } from '@shared/exceptions/decorators/MinLengthCustom';

export class CreateUserDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
