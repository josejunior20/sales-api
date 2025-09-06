import { Module } from '@nestjs/common';

import { HttpCustomerModule } from './infra/http/http-customer.module';
import { PrismaCustomerModule } from './infra/prisma/prisma-customer.module';

@Module({
  imports: [PrismaCustomerModule, HttpCustomerModule],
  exports: [PrismaCustomerModule],
})
export class CustomerModule {}
