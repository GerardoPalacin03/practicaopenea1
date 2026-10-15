import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveriesApiEndpoint } from './deliveries-api-endpoint';

/**
 * Infrastructure facade of the last-mile sub-domain.
 *
 * @summary Exposes the delivery operations to the application layer.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class LastMileApi extends BaseApi {
  /** HTTP client shared by the endpoints. */
  private readonly http = inject(HttpClient);

  /** Endpoint of the deliveries. */
  private readonly deliveriesEndpoint = new DeliveriesApiEndpoint(this.http);

  /**
   * Retrieves all deliveries.
   * @returns Stream with the deliveries.
   */
  getDeliveries = (): Observable<Delivery[]> => this.deliveriesEndpoint.getAll();

  /**
   * Retrieves the deliveries of an order.
   * @param orderId - Identifier of the order.
   * @returns Stream with the matching deliveries, empty when the order does not exist.
   */
  getDeliveriesByOrderId = (orderId: string): Observable<Delivery[]> =>
    this.deliveriesEndpoint.getAll({ orderId });

  /**
   * Updates a delivery.
   * @param delivery - Delivery with its new state.
   * @returns Stream with the updated delivery.
   */
  updateDelivery = (delivery: Delivery): Observable<Delivery> =>
    this.deliveriesEndpoint.update(delivery, delivery.id);
}
