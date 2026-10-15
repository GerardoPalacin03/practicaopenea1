import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Home view.
 *
 * @summary Landing view reachable at /home that shows the welcome text and the "Sold products" section.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
