import { InsufficientProductQuantityException } from '@modules/product/exceptions/insufficient-product-quantity.exception';
import { InvalidProductDecreaseQuantityException } from '@modules/product/exceptions/invalid-product-decrease-quantity.exception';
import { InvalidProductIncreaseQuantityException } from '@modules/product/exceptions/invalid-product-increase-quantity.exception';
import {
  BaseEntity,
  BaseEntityProps,
} from '@shared/domain/entities/Base.entity';
import { Replace } from '@shared/helpers/replace';
export interface ProductProps {
  code: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string[];
}
export class Product extends BaseEntity {
  private productProps: ProductProps;
  constructor(
    props: Replace<
      ProductProps & BaseEntityProps,
      { id?: string; createdAt?: Date; updatedAt?: Date }
    >,
  ) {
    super(props);
    this.productProps = props;
  }

  public get code(): string {
    return this.productProps.code;
  }
  public get name(): string {
    return this.productProps.name;
  }
  protected updateName(name: string): void {
    this.productProps.name = name;
    this.touch();
  }
  public get description(): string {
    return this.productProps.description;
  }
  protected updateDescription(description: string): void {
    this.productProps.description = description;
    this.touch();
  }
  public get price(): number {
    return this.productProps.price;
  }
  protected updatePrice(price: number): void {
    this.productProps.price = price;
    this.touch();
  }
  public get quantity(): number {
    return this.productProps.quantity;
  }
  protected updateQuantity(quantity: number): void {
    this.productProps.quantity = quantity;
    this.touch();
  }
  public get category(): string {
    return this.productProps.category;
  }
  protected updateCategory(category: string): void {
    this.productProps.category = category;
    this.touch();
  }
  public get image(): string[] {
    return this.productProps.image;
  }

  protected updateImage(image: string[]): void {
    this.productProps.image = image;
    this.touch();
  }

  decreaseQuantity(amount: number): void {
    if (amount <= 0) {
      throw new InvalidProductDecreaseQuantityException();
    }
    if (this.productProps.quantity < amount) {
      throw new InsufficientProductQuantityException();
    }
    this.productProps.quantity -= amount;
  }

  increaseQuantity(amount: number): void {
    if (amount <= 0) {
      throw new InvalidProductIncreaseQuantityException();
    }
    this.productProps.quantity += amount;
  }

  public updateProfile(props: Partial<ProductProps>): void {
    if (props.name !== undefined) this.updateName(props.name);
    if (props.description !== undefined)
      this.updateDescription(props.description);
    if (props.price !== undefined) this.updatePrice(props.price);
    if (props.quantity !== undefined) this.updateQuantity(props.quantity);
    if (props.category !== undefined) this.updateCategory(props.category);
    if (props.image !== undefined) this.updateImage(props.image);
  }
}
