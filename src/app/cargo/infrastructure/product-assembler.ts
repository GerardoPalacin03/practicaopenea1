import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Product } from '../domain/model/product.entity';
import { ProductResource, ProductsResponse } from './products-response';

/**
 * Maps products to and from API resources.
 *
 * @summary Assembler of the cargo sub-domain for products.
 * @author Gerardo Palacin
 */
export class ProductAssembler implements BaseAssembler<Product, ProductResource, ProductsResponse> {
  /**
   * Converts a response envelope into products.
   * @param response - Response returned by the API.
   * @returns The converted products.
   */
  toEntitiesFromResponse = (response: ProductsResponse): Product[] =>
    response.products.map((resource) => this.toEntityFromResource(resource));

  /**
   * Converts a resource into a product.
   * @param resource - Resource to convert.
   * @returns The converted product.
   */
  toEntityFromResource = (resource: ProductResource): Product =>
    new Product({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      price: resource.price,
      category: resource.category,
      stock: resource.stock,
    });

  /**
   * Converts a product into a resource.
   * @param entity - Product to convert.
   * @returns The converted resource.
   */
  toResourceFromEntity = (entity: Product): ProductResource => ({
    id: entity.id,
    name: entity.name,
    description: entity.description,
    price: entity.price,
    category: entity.category,
    stock: entity.stock,
  });
}
