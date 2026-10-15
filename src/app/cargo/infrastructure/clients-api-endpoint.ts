import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Client } from '../domain/model/client.entity';
import { ClientAssembler } from './client-assembler';
import { ClientResource, ClientsResponse } from './clients-response';

/**
 * REST endpoint of the clients.
 *
 * @summary Endpoint client that reads and writes clients through the generic base endpoint.
 * @author Gerardo Palacin
 */
export class ClientsApiEndpoint extends BaseApiEndpoint<
  Client,
  ClientResource,
  ClientsResponse,
  ClientAssembler
> {
  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderClientsEndpointPath}`,
      new ClientAssembler(),
    );
  }
}
