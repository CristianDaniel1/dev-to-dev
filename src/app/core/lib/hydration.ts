import { type Signal, afterNextRender, signal } from '@angular/core';

/**
 * Creates a signal that turns true once the page is hydrated in the browser. Until then,
 * components render the same neutral state as the prerendered HTML, which avoids hydration
 * mismatches with per-user data. Call it in an injection context.
 *
 * @returns A read-only signal; it stays false on the server.
 */
export const injectIsHydrated = (): Signal<boolean> => {
  const isHydrated = signal(false);
  afterNextRender(() => isHydrated.set(true));
  return isHydrated.asReadonly();
};

/**
 * Creates a signal with the time the page was hydrated, for date-dependent views (due reviews,
 * relative days) that must not render during prerendering. Call it in an injection context.
 *
 * @returns A read-only signal in milliseconds; 0 until hydration and on the server.
 */
export const injectHydrationTime = (): Signal<number> => {
  const time = signal(0);
  afterNextRender(() => time.set(Date.now()));
  return time.asReadonly();
};
