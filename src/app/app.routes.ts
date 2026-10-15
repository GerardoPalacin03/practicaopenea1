import { Routes } from '@angular/router';
import { Home } from './public/presentation/views/home/home';

const lastMileRoutes = () =>
  import('./last-mile/presentation/last-mile.routes').then((m) => m.lastMileRoutes);
const pageNotFound = () =>
  import('./public/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const baseTitle = 'Chazki Logistics Solutions';

/**
 * Root route table.
 *
 * @summary Composes the routes of every sub-domain; the wildcard route must stay last so unknown paths reach page-not-found.
 * @author Gerardo Palacin
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'last-mile', loadChildren: lastMileRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];

