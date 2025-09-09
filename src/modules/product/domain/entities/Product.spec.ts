import { makeProduct } from '@test/Product/product.factory';

describe('Product', () => {
  it('should be able to create a product', () => {
    const product = makeProduct();

    expect(product.name).toBe('Product 1');
    expect(product.description).toBe('Description 1');
    expect(product.price).toBe(10);
    expect(product.quantity).toBe(10);
    expect(product.category).toBe('Category 1');
    expect(product.image).toBe('Image 1');
  });

  it('should be able to update a product', () => {
    const product = makeProduct();
    product.updateProfile({
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      quantity: 20,
      category: 'Category 2',
      image: 'Image 2',
    });

    expect(product.name).toBe('Product 2');
    expect(product.description).toBe('Description 2');
    expect(product.price).toBe(20);
    expect(product.quantity).toBe(20);
    expect(product.category).toBe('Category 2');
    expect(product.image).toBe('Image 2');
  });
});
