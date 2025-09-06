import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';
import { IndividualCustomerRepository } from '@modules/customer/domain/repositories/Individual-customer.repositories';
import { Module } from '@nestjs/common';
import { DbModule } from '@shared/database/database.module';

import { PrismaBusinessCustomerRepository } from './repositories/prisma-business-customer.repository';
import { PrismaIndividualCustomerRepository } from './repositories/prisma-individual-customer.repository';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: IndividualCustomerRepository,
      useClass: PrismaIndividualCustomerRepository,
    },
    {
      provide: BusinessCustomerRepository,
      useClass: PrismaBusinessCustomerRepository,
    },
  ],
  exports: [IndividualCustomerRepository, BusinessCustomerRepository],
})
export class PrismaCustomerModule {}
