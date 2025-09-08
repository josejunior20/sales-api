import { IsEmailCustom } from '@shared/exceptions/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';

export class CreateBusinessCustomerDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  companyName: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  tradeName: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  cnpj: string;

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
