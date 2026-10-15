/**
 * Development environment settings.
 *
 * @summary Centralizes API URLs, endpoint paths and logo provider values so they are not hard-coded in the source.
 * @author Gerardo Palacin
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  platformProviderProductsEndpointPath: '/products',
  platformProviderClientsEndpointPath: '/clients',
  platformProviderDeliveriesEndpointPath: '/deliveries',
  logoProviderApiBaseUrl: 'https://img.logo.dev',
  logoProviderDomain: 'chazki.com',
  logoProviderToken: 'pk_JmaTsz0hSk6OHRoWn8IujA'
};

