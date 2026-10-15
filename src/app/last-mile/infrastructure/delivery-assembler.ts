import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveriesResponse, DeliveryResource } from './deliveries-response';

/**
 * Maps deliveries to and from API resources.
 *
 * @summary Assembler of the last-mile sub-domain for deliveries.
 * @author Gerardo Palacin
 */
export class DeliveryAssembler implements BaseAssembler<
  Delivery,
  DeliveryResource,
  DeliveriesResponse
> {
  /**
   * Converts a response envelope into deliveries.
   * @param response - Response returned by the API.
   * @returns The converted deliveries.
   */
  toEntitiesFromResponse = (response: DeliveriesResponse): Delivery[] =>
    response.deliveries.map((resource) => this.toEntityFromResource(resource));

  /**
   * Converts a resource into a delivery.
   * @param resource - Resource to convert.
   * @returns The converted delivery.
   */
  toEntityFromResource = (resource: DeliveryResource): Delivery =>
    new Delivery({
      id: resource.id,
      orderId: resource.orderId,
      clientId: resource.clientId,
      productId: resource.productId,
      deliveryDate: resource.deliveryDate,
      deliveryAddress: resource.deliveryAddress,
      status: resource.status,
    });

  /**
   * Converts a delivery into a resource.
   * @param entity - Delivery to convert.
   * @returns The converted resource.
   */
  toResourceFromEntity = (entity: Delivery): DeliveryResource => ({
    id: entity.id,
    orderId: entity.orderId,
    clientId: entity.clientId,
    productId: entity.productId,
    deliveryDate: entity.deliveryDate,
    deliveryAddress: entity.deliveryAddress,
    status: entity.status,
  });
}
