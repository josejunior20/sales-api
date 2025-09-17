import { Module } from '@nestjs/common';

import { PrismaProductModule } from './infra/prisma/prisma-product.module';

@Module({
  imports: [PrismaProductModule],
})
export class ProductModule {}
