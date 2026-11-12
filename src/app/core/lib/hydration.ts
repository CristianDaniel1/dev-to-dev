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
