import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { BrandLogo } from '../brand-logo/brand-logo';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * Application shell.
 *
 * @summary Toolbar with the logo and title on the left, the navigation options at the center and the language switcher on the right, followed by the routed content.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    TranslatePipe,
    BrandLogo,
    LanguageSwitcher,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  /** Navigation options shown at the center of the toolbar. */
  protected readonly options = [
    { link: '/home', label: 'option.home' },
    { link: '/last-mile/deliveries/new', label: 'option.delivery' },
  ];
}
