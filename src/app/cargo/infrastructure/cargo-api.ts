import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Client } from '../domain/model/client.entity';
import { Product } from '../domain/model/product.entity';
import { ClientsApiEndpoint } from './clients-api-endpoint';
import { ProductsApiEndpoint } from './products-api-endpoint';

/**
 * Infrastructure facade of the cargo sub-domain.
 *
 * @summary Exposes the product and client operations to the application layer.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class CargoApi extends BaseApi {
  /** HTTP client shared by the endpoints. */
  private readonly http = inject(HttpClient);

  /** Endpoint of the products. */
  private readonly productsEndpoint = new ProductsApiEndpoint(this.http);

  /** Endpoint of the clients. */
  private readonly clientsEndpoint = new ClientsApiEndpoint(this.http);

  /**
   * Retrieves all products.
   * @returns Stream with the products.
   */
  getProducts = (): Observable<Product[]> => this.productsEndpoint.getAll();

  /**
   * Retrieves all clients.
   * @returns Stream with the clients.
   */
  getClients = (): Observable<Client[]> => this.clientsEndpoint.getAll();
}
