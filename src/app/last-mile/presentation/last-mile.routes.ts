import { Routes } from '@angular/router';

const productDelivery = () =>
  import('./views/product-delivery/product-delivery').then((m) => m.ProductDelivery);
const baseTitle = 'Chazki Logistics Solutions';

/**
 * Routes of the last-mile sub-domain.
 *
 * @summary Declares the navigation routes loaded lazily under /last-mile.
 * @author Gerardo Palacin
 */
export const lastMileRoutes: Routes = [
  {
    path: 'deliveries/new',
    loadComponent: productDelivery,
    title: `${baseTitle} - Product Delivery`,
  },
];
