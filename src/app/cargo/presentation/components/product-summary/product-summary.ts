import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../../domain/model/product.entity';

/**
 * Product summary card.
 *
 * @summary Card with the product name in the header, its description, price and category in the content, and the Delivered Products indicator in the footer.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-product-summary',
  imports: [MatCardModule, CurrencyPipe, TranslatePipe],
  templateUrl: './product-summary.html',
  styleUrl: './product-summary.css',
})
export class ProductSummary {
  /** Product shown by the card. */
  readonly product = input.required<Product>();

  /** Number of clients that already received the product; zero shows "No Delivered". */
  readonly deliveredClients = input<number>(0);
}
