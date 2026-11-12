import {
  type ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  TitleStrategy,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AppErrorHandler } from '@/core/services/app-error-handler';
import { SeoTitleStrategy } from '@/core/services/seo-title-strategy';
import { skipSamePageTransition } from '@/core/lib/view-transition';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({ onViewTransitionCreated: skipSamePageTransition }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useExisting: SeoTitleStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
};
