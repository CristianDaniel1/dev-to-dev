import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESOURCE_LIBRARY } from '@/shared/generated/resource-library';
import { TECH_RESOURCES_LIMIT } from '../../constants/resource-display.constants';
import { resourcesForTech } from '../../lib/resources-for-tech';
import { ResourceItem } from '../resource-item/resource-item';

/** "To study" section of a quiz tech page: the best resources tagged with that tech. */
@Component({
  selector: 'app-tech-resources',
  imports: [RouterLink, ResourceItem],
  templateUrl: './tech-resources.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechResources {
  /** Tech slug, e.g. 'css'. */
  readonly tech = input.required<string>();
  /** Display name of the tech. */
  readonly name = input.required<string>();

  protected readonly resources = computed(() =>
    resourcesForTech(RESOURCE_LIBRARY.resources, this.tech(), TECH_RESOURCES_LIMIT),
  );
}
