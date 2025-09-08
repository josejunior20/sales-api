import { IsCpfCustom } from '@shared/exceptions/decorators/IsCpfCustom';
import { IsEmailCustom } from '@shared/exceptions/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';

export class CreateIndividualCustomerDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsCpfCustom()
  cpf: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  phone: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  address: string;
}
