import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { CargoStore } from '../../../../cargo/application/cargo.store';
import { ProductSummary } from '../../../../cargo/presentation/components/product-summary/product-summary';

/**
 * Home view.
 *
 * @summary Landing view reachable at /home that shows the welcome text and the "Sold products" grid of product summaries.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, MatProgressSpinnerModule, TranslatePipe, ProductSummary],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  /** Store with the products shown in the grid. */
  protected readonly store = inject(CargoStore);
}

