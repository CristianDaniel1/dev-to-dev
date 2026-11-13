import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { reportError } from './app/core/lib/report-error';

bootstrapApplication(App, appConfig).catch((error: unknown) => reportError('bootstrap', error));
