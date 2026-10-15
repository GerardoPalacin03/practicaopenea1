import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseEntity } from '../domain/model/base-entity';
import { BaseAssembler } from './base-assembler';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Generic CRUD operations for a single REST endpoint.
 *
 * @summary Reusable endpoint class that maps resources to entities through an assembler.
 * @author Gerardo Palacin
 *
 * @typeParam TEntity - Domain entity handled by the endpoint.
 * @typeParam TResource - Resource exchanged with the API.
 * @typeParam TResponse - Response envelope returned by collection queries.
 * @typeParam TAssembler - Mapper between entities and resources.
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>,
> {
  /**
   * @param http - HTTP client used for the requests.
   * @param endpointUrl - Complete URL of the endpoint.
   * @param assembler - Assembler that converts between entities and resources.
   */
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: TAssembler,
  ) {}

  /**
   * Fetches the entities of the endpoint, optionally filtered by query parameters.
   * @param params - Query parameters used to filter the collection.
   * @returns Stream with the mapped entities.
   */
  getAll(params: Record<string, string | number> = {}): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl, { params }).pipe(
      map((response) =>
        Array.isArray(response)
          ? response.map((resource) => this.assembler.toEntityFromResource(resource))
          : this.assembler.toEntitiesFromResponse(response as TResponse),
      ),
      catchError(this.handleError('Failed to fetch entities')),
    );
  }

  /**
   * Fetches one entity by identifier.
   * @param id - Entity identifier.
   * @returns Stream with the mapped entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity')),
    );
  }

  /**
   * Creates an entity.
   * @param entity - Entity to persist.
   * @returns Stream with the entity returned by the API.
   */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map((created) => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity')),
    );
  }

  /**
   * Replaces an existing entity.
   * @param entity - Entity state to persist.
   * @param id - Identifier of the target entity.
   * @returns Stream with the entity returned by the API.
   */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map((updated) => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity')),
    );
  }

  /**
   * Builds an HTTP error handler for an operation.
   * @param operation - Description of the failed operation.
   * @returns Function that turns an HTTP error into a failed stream.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const reason =
        error.status === 404 ? 'Resource not found' : error.statusText || 'Unexpected error';
      return throwError(() => new Error(`${operation}: ${reason}`));
    };
  }
}
