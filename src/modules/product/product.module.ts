import { Module } from '@nestjs/common';

import { ProductHttpModule } from './infra/http/product.http';
import { PrismaProductModule } from './infra/prisma/prisma-product.module';

@Module({
  imports: [PrismaProductModule, ProductHttpModule],
})
export class ProductModule {}
