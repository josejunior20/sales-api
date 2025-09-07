import { PartialType } from '@nestjs/mapped-types';

import { CreateIndividualCustomerDto } from './create-individual-customer.dto';
export class UpdateIndividualCustomerDto extends PartialType(
  CreateIndividualCustomerDto,
) {}
