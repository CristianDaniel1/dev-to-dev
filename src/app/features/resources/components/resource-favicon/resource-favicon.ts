import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

/** Site icon of a resource, served by the site itself; the first letter of the name shows when there is no icon. */
@Component({
  selector: 'app-resource-favicon',
  templateUrl: './resource-favicon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'shrink-0', 'aria-hidden': 'true' },
})
export class ResourceFavicon {
  readonly src = input<string>();
  readonly name = input.required<string>();

  protected readonly hasFailed = signal(false);
  protected readonly initial = computed(() => this.name().charAt(0).toUpperCase());
}
