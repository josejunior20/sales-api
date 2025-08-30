import { Email } from '@shared/domain/values-objects/email.value-object';
import { IsEmailCustom } from '@shared/exceptions/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';
import { MinLengthCustom } from '@shared/exceptions/decorators/MinLengthCustom';

export class SignInDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: Email;

  @IsStringCustom()
  @MinLengthCustom(6)
  password: string;
}
