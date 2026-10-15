/**
 * Marker interface for the HTTP response envelopes returned by the API.
 *
 * @summary Base type of the Response pattern.
 * @author Gerardo Palacin
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseResponse {}

/**
 * Base contract for the API resources that expose a numeric identifier.
 *
 * @summary Base type of the Resource pattern.
 * @author Gerardo Palacin
 */
export interface BaseResource {
  /** Unique identifier of the resource. */
  id: number;
}
