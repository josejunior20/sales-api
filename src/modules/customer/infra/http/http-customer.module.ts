import { CreateBusinessCustomerService } from '@modules/customer/domain/services/Create-business-customer.service';
import { CreateIndividualCustomerService } from '@modules/customer/domain/services/Create-individual-customer.service';
import { DeleteBusinessCustomerService } from '@modules/customer/domain/services/Delete-business-customer.service';
import { DeleteIndividualCustomerService } from '@modules/customer/domain/services/Delete-individual-customer.service';
import { GetAllBusinessCustomerService } from '@modules/customer/domain/services/Get-all-business-customer.service';
import { GetAllIndividualCustomerService } from '@modules/customer/domain/services/Get-all-individual-customer.service';
import { UpdateBusinessCustomerService } from '@modules/customer/domain/services/Update-business-customer.service';
import { UpdateIndividualCustomerService } from '@modules/customer/domain/services/update-individual-customer.service';
import { Module } from '@nestjs/common';

import { PrismaCustomerModule } from '../prisma/prisma-customer.module';
import { BusinessCustomerController } from './controllers/business-customer.controller';
import { IndividualCustomerController } from './controllers/individual-customer.controller';

@Module({
  imports: [PrismaCustomerModule],
  controllers: [IndividualCustomerController, BusinessCustomerController],
  providers: [
    CreateIndividualCustomerService,
    GetAllIndividualCustomerService,
    UpdateIndividualCustomerService,
    DeleteIndividualCustomerService,
    CreateBusinessCustomerService,
    GetAllBusinessCustomerService,
    UpdateBusinessCustomerService,
    DeleteBusinessCustomerService,
  ],
})
export class HttpCustomerModule {}
