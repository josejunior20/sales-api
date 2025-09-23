import { CreateProductService } from '@modules/product/domain/services/Create-product.service';
import { DecreaseProductQuantityService } from '@modules/product/domain/services/Decrease-product-quantity.service';
import { DeleteProductService } from '@modules/product/domain/services/delete-product.service';
import { GetAllProductService } from '@modules/product/domain/services/Get-all-product.service';
import { GetProductService } from '@modules/product/domain/services/Get-product.service';
import { IncreaseProductQuantityService } from '@modules/product/domain/services/Increase-product-quantity.service';
import { UpdateProductService } from '@modules/product/domain/services/Update-product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateProductDto } from '../dtos/Create-product.dto';
import {
  DecreaseQuantityDto,
  IncreaseQuantityDto,
} from '../dtos/Increase-decrease-product.dto';
import { UpdateProductDto } from '../dtos/Update-product.dto';
import { ProductViewModel } from '../view-models/product.view-model';

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly getProductService: GetProductService,
    private readonly getAllProductService: GetAllProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly increaseProductQuantityService: IncreaseProductQuantityService,
    private readonly decreaseProductQuantityService: DecreaseProductQuantityService,
  ) {}

  @Post()
  async create(
    @Body()
    { name, description, price, quantity, category, image }: CreateProductDto,
  ) {
    await this.createProductService.execute({
      name,
      description,
      price,
      quantity,
      category,
      image,
    });
    return { message: 'Product created successfully' };
  }

  @Get()
  async listAll() {
    const { products } = await this.getAllProductService.execute();
    return { products: products.map(ProductViewModel.toHTTP) };
  }

  @Get(':id')
  async findById(@Param('id') productId: string) {
    const { product } = await this.getProductService.execute({ productId });
    return { product: ProductViewModel.toHTTP(product) };
  }

  @Put(':id')
  async update(
    @Param('id') productId: string,
    @Body()
    { name, description, price, category, image }: UpdateProductDto,
  ) {
    await this.updateProductService.execute({
      productId,
      name,
      description,
      price,
      category,
      image,
    });
    return { message: 'Product updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') productId: string) {
    await this.deleteProductService.execute({ productId });
    return { message: 'Product deleted successfully' };
  }

  @Put(':id/increase')
  async increaseQuantity(
    @Param('id') productId: string,
    @Body() { quantityPushed }: IncreaseQuantityDto,
  ) {
    await this.increaseProductQuantityService.execute({
      productId,
      quantityPushed,
    });
    return { message: 'Product quantity increased successfully' };
  }

  @Put(':id/decrease')
  async decreaseQuantity(
    @Param('id') productId: string,
    @Body() { quantitySold }: DecreaseQuantityDto,
  ) {
    await this.decreaseProductQuantityService.execute({
      productId,
      quantitySold,
    });
    return { message: 'Product quantity decreased successfully' };
  }
}
