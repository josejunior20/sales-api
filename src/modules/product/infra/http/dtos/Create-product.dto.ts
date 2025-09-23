import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';
import { IsNumberCustom } from '@shared/exceptions/decorators/IsNumberCustom';
import { IsStringCustom } from '@shared/exceptions/decorators/IsStringCustom';
import { IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsStringCustom()
  description: string;

  @IsNotEmptyCustom()
  @IsNumberCustom()
  price: number;

  @IsNotEmptyCustom()
  @IsNumberCustom()
  quantity: number;

  @IsNotEmptyCustom()
  @IsStringCustom()
  category: string;

  @IsArray()
  @IsStringCustom({ each: true })
  image: string[];
}
