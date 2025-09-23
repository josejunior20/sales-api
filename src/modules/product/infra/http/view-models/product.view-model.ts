import { Product } from '@modules/product/domain/entities/Product';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
    };
  }
}
