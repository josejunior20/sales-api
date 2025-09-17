import { ProductRepository } from '@modules/product/domain/repositories/Product.repository';
import { Module } from '@nestjs/common';
import { DbModule } from '@shared/database/database.module';

import { PrismaProductRepository } from './repositories/prisma-product.repository';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductRepository],
})
export class PrismaProductModule {}
