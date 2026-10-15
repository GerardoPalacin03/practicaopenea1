import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

/**
 * Brand logo of the application.
 *
 * @summary Shows the company logo from the Logo.dev API and falls back to a local image when the remote logo fails.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-brand-logo',
  imports: [TranslatePipe],
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.css',
})
export class BrandLogo {
  /** Local image used when the remote logo cannot be loaded. */
  private readonly fallbackLogoUrl = 'chazki-logo.svg';

  /** Current source of the logo image. */
  protected readonly logoUrl = signal(
    `${environment.logoProviderApiBaseUrl}/${environment.logoProviderDomain}` +
      `?token=${environment.logoProviderToken}&format=webp&retina=true`,
  );

  /** Switches to the local logo once, avoiding a loop if the local image also fails. */
  protected showFallbackLogo(): void {
    if (this.logoUrl() !== this.fallbackLogoUrl) {
      this.logoUrl.set(this.fallbackLogoUrl);
    }
  }
}
