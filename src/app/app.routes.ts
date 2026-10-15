import { Routes } from '@angular/router';

/**
 * Root route table.
 *
 * @summary Redirects the root path to Home; each sub-domain adds its own routes here.
 * @author Gerardo Palacin
 */
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }


];
