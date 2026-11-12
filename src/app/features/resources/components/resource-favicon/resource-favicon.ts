import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { injectIsHydrated } from '@/core/lib/hydration';
import { faviconUrl } from '../../lib/favicon-url';

/**
 * Site icon of a resource. Prerendered as the first letter of the name; the favicon loads only
 * in the browser and the letter stays if it fails.
 */
@Component({
  selector: 'app-resource-favicon',
  templateUrl: './resource-favicon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'shrink-0', 'aria-hidden': 'true' },
})
export class ResourceFavicon {
  readonly domain = input.required<string>();
  readonly name = input.required<string>();

  protected readonly isHydrated = injectIsHydrated();
  protected readonly hasFailed = signal(false);
  protected readonly src = computed(() => faviconUrl(this.domain()));
  protected readonly initial = computed(() => this.name().charAt(0).toUpperCase());
}
