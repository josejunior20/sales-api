import { CreateProductService } from '@modules/product/domain/services/Create-product.service';
import { DecreaseProductQuantityService } from '@modules/product/domain/services/Decrease-product-quantity.service';
import { DeleteProductService } from '@modules/product/domain/services/delete-product.service';
import { GetAllProductService } from '@modules/product/domain/services/Get-all-product.service';
import { GetProductService } from '@modules/product/domain/services/Get-product.service';
import { IncreaseProductQuantityService } from '@modules/product/domain/services/Increase-product-quantity.service';
import { UpdateProductService } from '@modules/product/domain/services/Update-product.service';
import { ProductController } from '@modules/product/infra/http/controllers/product.controller';
import { PrismaProductModule } from '@modules/product/infra/prisma/prisma-product.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaProductModule],
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetAllProductService,
    GetProductService,
    UpdateProductService,
    DeleteProductService,
    IncreaseProductQuantityService,
    DecreaseProductQuantityService,
  ],
})
export class ProductHttpModule {}
