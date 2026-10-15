import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Product } from '../domain/model/product.entity';
import { ProductAssembler } from './product-assembler';
import { ProductResource, ProductsResponse } from './products-response';

/**
 * REST endpoint of the products.
 *
 * @summary Endpoint client that reads and writes products through the generic base endpoint.
 * @author Gerardo Palacin
 */
export class ProductsApiEndpoint extends BaseApiEndpoint<
  Product,
  ProductResource,
  ProductsResponse,
  ProductAssembler
> {
  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderProductsEndpointPath}`,
      new ProductAssembler(),
    );
  }
}
