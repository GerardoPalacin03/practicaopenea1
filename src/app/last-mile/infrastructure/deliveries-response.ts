import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { DeliveryStatus } from '../domain/model/delivery.entity';

/**
 * API representation of a delivery.
 *
 * @summary Resource of the Resource pattern for deliveries.
 * @author Gerardo Palacin
 */
export interface DeliveryResource extends BaseResource {
  /** Unique identifier of the delivery. */
  id: number;
  /** Identifier of the order. */
  orderId: string;
  /** Identifier of the client. */
  clientId: number;
  /** Identifier of the product. */
  productId: number;
  /** Delivery date in ISO format. */
  deliveryDate: string;
  /** Delivery address. */
  deliveryAddress: string;
  /** Current status. */
  status: DeliveryStatus;
}

/**
 * Response envelope for delivery collection queries.
 *
 * @summary Response of the Request/Response pattern for deliveries.
 * @author Gerardo Palacin
 */
export interface DeliveriesResponse extends BaseResponse {
  /** Deliveries returned by the API. */
  deliveries: DeliveryResource[];
}
