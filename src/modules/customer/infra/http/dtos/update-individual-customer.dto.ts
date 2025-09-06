import { PartialType } from '@nestjs/swagger';

import { CreateIndividualCustomerDto } from './create-individual-customer.dto';
export class UpdateIndividualCustomerDto extends PartialType(
  CreateIndividualCustomerDto,
) {}
