import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * API representation of a client.
 *
 * @summary Resource of the Resource pattern for clients.
 * @author Gerardo Palacin
 */
export interface ClientResource extends BaseResource {
  /** Unique identifier of the client. */
  id: number;
  /** Full name of the client. */
  name: string;
  /** Email address of the client. */
  email: string;
  /** Phone number of the client. */
  phone: string;
  /** Postal address of the client. */
  address: string;
}

/**
 * Response envelope for client collection queries.
 *
 * @summary Response of the Request/Response pattern for clients.
 * @author Gerardo Palacin
 */
export interface ClientsResponse extends BaseResponse {
  /** Clients returned by the API. */
  clients: ClientResource[];
}
