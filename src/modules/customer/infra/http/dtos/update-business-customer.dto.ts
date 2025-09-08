import { PartialType } from '@nestjs/mapped-types';

import { CreateBusinessCustomerDto } from './create-business-customer.dto';

export class UpdateBusinessCustomerDto extends PartialType(
  CreateBusinessCustomerDto,
) {}
