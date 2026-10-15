import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Client } from '../domain/model/client.entity';
import { Product } from '../domain/model/product.entity';
import { CargoApi } from '../infrastructure/cargo-api';

/**
 * Application state of the cargo sub-domain.
 *
 * @summary Signal store that loads products and clients and exposes them to the views.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class CargoStore {
  /** Infrastructure facade used to reach the API. */
  private readonly cargoApi = inject(CargoApi);

  /** Writable list of products. */
  private readonly productsSignal = signal<Product[]>([]);

  /** Writable list of clients. */
  private readonly clientsSignal = signal<Client[]>([]);

  /** Writable loading flag. */
  private readonly loadingSignal = signal<boolean>(false);

  /** Writable error message. */
  private readonly errorSignal = signal<string | null>(null);

  /** Read-only list of products. */
  readonly products = this.productsSignal.asReadonly();

  /** Read-only list of clients. */
  readonly clients = this.clientsSignal.asReadonly();

  /** Read-only loading flag. */
  readonly loading = this.loadingSignal.asReadonly();

  /** Read-only error message. */
  readonly error = this.errorSignal.asReadonly();

  /** Number of products currently loaded. */
  readonly productCount = computed(() => this.products().length);

  /** Loads the products and the clients when the store is created. */
  constructor() {
    this.loadProducts();
    this.loadClients();
  }

  /**
   * Selects a product by identifier.
   * @param id - Product identifier.
   * @returns Reactive selection of the product.
   */
  getProductById = (id: number): Signal<Product | undefined> =>
    computed(() => this.products().find((product) => product.id === id));

  /** Loads the products from the API. */
  private loadProducts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.cargoApi
      .getProducts()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (products) => {
          this.productsSignal.set(products);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set(this.formatError(error, 'Failed to load products'));
          this.loadingSignal.set(false);
        },
      });
  }

  /** Loads the clients from the API. */
  private loadClients(): void {
    this.cargoApi
      .getClients()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (clients) => this.clientsSignal.set(clients),
        error: (error) => this.errorSignal.set(this.formatError(error, 'Failed to load clients')),
      });
  }

  /**
   * Builds a readable error message.
   * @param error - Error received from the API.
   * @param fallback - Message used when the error has none.
   * @returns The message to show.
   */
  private formatError(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
