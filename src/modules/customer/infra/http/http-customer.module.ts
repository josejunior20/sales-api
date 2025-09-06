import { CreateIndividualCustomerService } from '@modules/customer/domain/services/Create-individual-customer.service';
import { DeleteIndividualCustomerService } from '@modules/customer/domain/services/Delete-individual-customer.service';
import { GetAllIndividualCustomerService } from '@modules/customer/domain/services/Get-all-individual-customer.service';
import { UpdateIndividualCustomerService } from '@modules/customer/domain/services/update-individual-customer.service';
import { Module } from '@nestjs/common';

import { PrismaCustomerModule } from '../prisma/prisma-customer.module';
import { IndividualCustomerController } from './controllers/individual-customer.controller';

@Module({
  imports: [PrismaCustomerModule],
  controllers: [IndividualCustomerController],
  providers: [
    CreateIndividualCustomerService,
    GetAllIndividualCustomerService,
    UpdateIndividualCustomerService,
    DeleteIndividualCustomerService,
  ],
})
export class HttpCustomerModule {}
