import {
  Product,
  ProductProps,
} from '@modules/product/domain/entities/Product';

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}) {
  return new Product({
    name: 'Product 1',
    description: 'Description 1',
    price: 10,
    quantity: 10,
    category: 'Category 1',
    image: 'Image 1',
    ...override,
  });
}
