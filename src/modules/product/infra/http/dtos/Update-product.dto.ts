import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './Create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
