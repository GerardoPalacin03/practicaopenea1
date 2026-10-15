import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * API representation of a product.
 *
 * @summary Resource of the Resource pattern for products.
 * @author Gerardo Palacin
 */
export interface ProductResource extends BaseResource {
  /** Unique identifier of the product. */
  id: number;
  /** Name of the product. */
  name: string;
  /** Description of the product. */
  description: string;
  /** Unit price of the product. */
  price: number;
  /** Category of the product. */
  category: string;
  /** Units available in stock. */
  stock: number;
}

/**
 * Response envelope for product collection queries.
 *
 * @summary Response of the Request/Response pattern for products.
 * @author Gerardo Palacin
 */
export interface ProductsResponse extends BaseResponse {
  /** Products returned by the API. */
  products: ProductResource[];
}
