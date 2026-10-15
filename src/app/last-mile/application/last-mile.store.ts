import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { Delivery } from '../domain/model/delivery.entity';
import { LastMileApi } from '../infrastructure/last-mile-api';

/**
 * Outcome of trying to deliver a product.
 *
 * @summary "delivered" when the status changed, "invalid-order" when the order does not exist and "not-shipped" when the order is not in Shipped status.
 * @author Gerardo Palacin
 */
export type DeliveryResult = 'delivered' | 'invalid-order' | 'not-shipped';

/**
 * Application state of the last-mile sub-domain.
 *
 * @summary Signal store that loads deliveries, counts delivered clients per product and records product deliveries.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class LastMileStore {
  /** Infrastructure facade used to reach the API. */
  private readonly lastMileApi = inject(LastMileApi);

  /** Lifecycle reference used to cancel requests made outside the constructor. */
  private readonly destroyRef = inject(DestroyRef);

  /** Writable list of deliveries. */
  private readonly deliveriesSignal = signal<Delivery[]>([]);

  /** Writable outcome of the last delivery attempt. */
  private readonly resultSignal = signal<DeliveryResult | null>(null);

  /** Writable error message. */
  private readonly errorSignal = signal<string | null>(null);

  /** Read-only list of deliveries. */
  readonly deliveries = this.deliveriesSignal.asReadonly();

  /** Read-only outcome of the last delivery attempt. */
  readonly result = this.resultSignal.asReadonly();

  /** Read-only error message. */
  readonly error = this.errorSignal.asReadonly();

  /** Number of distinct clients that already received each product, indexed by product identifier. */
  readonly deliveredClientsByProduct = computed(() => {
    const clientsByProduct = new Map<number, Set<number>>();
    for (const delivery of this.deliveries()) {
      if (delivery.isDelivered) {
        const clients = clientsByProduct.get(delivery.productId) ?? new Set<number>();
        clients.add(delivery.clientId);
        clientsByProduct.set(delivery.productId, clients);
      }
    }
    return new Map(
      [...clientsByProduct].map(
        ([productId, clients]) => [productId, clients.size] as [number, number],
      ),
    );
  });

  /** Loads the deliveries when the store is created. */
  constructor() {
    this.loadDeliveries();
  }

  /**
   * Tries to deliver the product of an order: the order must exist and be in Shipped status.
   * @param orderId - Identifier of the order entered by the user.
   */
  deliverProduct(orderId: string): void {
    this.resultSignal.set(null);
    this.errorSignal.set(null);
    this.lastMileApi
      .getDeliveriesByOrderId(orderId.trim())
      .pipe(
        switchMap((matches) => {
          const delivery = matches[0];
          if (!delivery) {
            return of<DeliveryResult>('invalid-order');
          }
          if (!delivery.isShipped) {
            return of<DeliveryResult>('not-shipped');
          }
          delivery.status = 'Delivered';
          return this.lastMileApi.updateDelivery(delivery).pipe(
            switchMap((updated) => {
              this.deliveriesSignal.update((current) =>
                current.map((item) => (item.id === updated.id ? updated : item)),
              );
              return of<DeliveryResult>('delivered');
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (result) => this.resultSignal.set(result),
        error: (error) =>
          this.errorSignal.set(
            error instanceof Error ? error.message : 'Failed to deliver product',
          ),
      });
  }

  /** Loads the deliveries from the API. */
  private loadDeliveries(): void {
    this.lastMileApi
      .getDeliveries()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (deliveries) => this.deliveriesSignal.set(deliveries),
        error: (error) =>
          this.errorSignal.set(
            error instanceof Error ? error.message : 'Failed to load deliveries',
          ),
      });
  }
}
