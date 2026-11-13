import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GLOSSARY_ALPHABET } from '../../constants/glossary.constants';
import type { LetterSection } from '../../interfaces/letter-section.interface';
import { letterAnchor } from '../../lib/letter-sections';

/** A to Z row of answer bubbles; letters with terms jump to their section. */
@Component({
  selector: 'app-letter-nav',
  imports: [RouterLink],
  templateUrl: './letter-nav.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterNav {
  readonly sections = input.required<readonly LetterSection[]>();

  protected readonly alphabet = GLOSSARY_ALPHABET;
  protected readonly anchor = letterAnchor;
  protected readonly available = computed(
    () => new Set(this.sections().map((section) => section.letter)),
  );
}
