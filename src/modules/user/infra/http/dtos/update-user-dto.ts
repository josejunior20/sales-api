import { IsEmailCustom } from '@shared/exceptions/decorators/IsEmailCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';
import { MinLengthCustom } from '@shared/exceptions/decorators/MinLengthCustom';
import { IsOptional, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsStringCustom()
  name?: string;

  @IsOptional()
  @IsEmailCustom()
  email?: string;

  @IsOptional()
  @MinLengthCustom(6)
  password?: string;

  @ValidateIf(dto => dto.password !== undefined)
  @MinLengthCustom(6)
  oldPassword?: string;
}
