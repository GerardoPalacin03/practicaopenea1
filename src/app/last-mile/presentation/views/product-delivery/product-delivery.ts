import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { LastMileStore } from '../../../application/last-mile.store';

/**
 * Product delivery view.
 *
 * @summary View reachable at /last-mile/deliveries/new with the form that records the delivery of a product to a client.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-product-delivery',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './product-delivery.html',
  styleUrl: './product-delivery.css',
})
export class ProductDelivery {
  /** Store that records the deliveries. */
  protected readonly store = inject(LastMileStore);

  /** Builder used to create the form. */
  private readonly formBuilder = inject(FormBuilder);

  /** Form with the order identifier and the product identifier. */
  protected readonly form = this.formBuilder.nonNullable.group({
    orderId: ['', [Validators.required]],
    productId: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  /** Sends the form when it is valid; otherwise it marks the fields as touched to show the errors. */
  protected deliverProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.deliverProduct(this.form.controls.orderId.value);
  }
}
