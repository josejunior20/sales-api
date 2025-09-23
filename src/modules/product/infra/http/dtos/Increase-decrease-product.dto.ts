import { IsInt, Min } from 'class-validator';

export class IncreaseQuantityDto {
  @IsInt()
  @Min(1)
  quantityPushed: number;
}

export class DecreaseQuantityDto {
  @IsInt()
  @Min(1)
  quantitySold: number;
}
