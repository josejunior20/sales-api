import { InsufficientProductQuantityException } from '@modules/product/exceptions/insufficient-product-quantity.exception';
import { InvalidProductDecreaseQuantityException } from '@modules/product/exceptions/invalid-product-decrease-quantity.exception';
import { InvalidProductIncreaseQuantityException } from '@modules/product/exceptions/invalid-product-increase-quantity.exception';
import { makeProduct } from '@test/Product/product.factory';

import { Product } from './Product';

describe('Product', () => {
  let product: Product;
  beforeEach(() => {
    for (let i = 0; i < 10; i++) {
      product = makeProduct({ quantity: 10 });
    }
  });
  it('should be able to create a product', () => {
    const product = makeProduct();

    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.price).toBe(10);
    expect(product.quantity).toBe(10);
    expect(product.category).toBe('Category 1');
    expect(product.image[0]).toBe('Image 1');
  });

  it('should be able to update a product', () => {
    const product = makeProduct();
    product.updateProfile({
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      quantity: 20,
      category: 'Category 2',
      image: ['Image 2'],
    });

    expect(product.name).toBe('Product 2');
    expect(product.description).toBe('Description 2');
    expect(product.price).toBe(20);
    expect(product.quantity).toBe(20);
    expect(product.category).toBe('Category 2');
    expect(product.image[0]).toBe('Image 2');
  });

  it('should be able to decrease quantity', () => {
    product.decreaseQuantity(4);

    expect(product.quantity).toBe(6);
  });

  it('should not be able to decrease quantity if quantity is less than amount', () => {
    expect(async () => {
      product.decreaseQuantity(11);
    }).rejects.toBeInstanceOf(InsufficientProductQuantityException);
  });

  it('should not be able to decrease quantity if amount is less than 0', () => {
    expect(async () => {
      product.decreaseQuantity(-1);
    }).rejects.toBeInstanceOf(InvalidProductDecreaseQuantityException);
  });

  it('should be able to increase quantity', () => {
    product.increaseQuantity(4);

    expect(product.quantity).toBe(14);
  });

  it('should not be able to increase quantity if amount is less than 0', () => {
    expect(async () => {
      product.increaseQuantity(-1);
    }).rejects.toBeInstanceOf(InvalidProductIncreaseQuantityException);
  });
});
