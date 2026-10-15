import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Client } from '../domain/model/client.entity';
import { ClientResource, ClientsResponse } from './clients-response';

/**
 * Maps clients to and from API resources.
 *
 * @summary Assembler of the cargo sub-domain for clients.
 * @author Gerardo Palacin
 */
export class ClientAssembler implements BaseAssembler<Client, ClientResource, ClientsResponse> {
  /**
   * Converts a response envelope into clients.
   * @param response - Response returned by the API.
   * @returns The converted clients.
   */
  toEntitiesFromResponse = (response: ClientsResponse): Client[] =>
    response.clients.map((resource) => this.toEntityFromResource(resource));

  /**
   * Converts a resource into a client.
   * @param resource - Resource to convert.
   * @returns The converted client.
   */
  toEntityFromResource = (resource: ClientResource): Client =>
    new Client({
      id: resource.id,
      name: resource.name,
      email: resource.email,
      phone: resource.phone,
      address: resource.address,
    });

  /**
   * Converts a client into a resource.
   * @param entity - Client to convert.
   * @returns The converted resource.
   */
  toResourceFromEntity = (entity: Client): ClientResource => ({
    id: entity.id,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    address: entity.address,
  });
}
