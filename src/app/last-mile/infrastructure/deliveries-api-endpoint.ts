import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveriesResponse, DeliveryResource } from './deliveries-response';
import { DeliveryAssembler } from './delivery-assembler';

/**
 * REST endpoint of the deliveries.
 *
 * @summary Endpoint client that reads and updates deliveries through the generic base endpoint.
 * @author Gerardo Palacin
 */
export class DeliveriesApiEndpoint extends BaseApiEndpoint<
  Delivery,
  DeliveryResource,
  DeliveriesResponse,
  DeliveryAssembler
> {
  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDeliveriesEndpointPath}`,
      new DeliveryAssembler(),
    );
  }
}
