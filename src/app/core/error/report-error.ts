import { type ErrorHandler, Injectable } from '@angular/core';

/**
 * Single entry point for error reporting. Logs to the console for now; a
 * monitoring service integration belongs here.
 * @param context Where the error happened, e.g. 'storage:read'.
 * @param error The caught error.
 */
export function reportError(context: string, error: unknown): void {
  console.error(`[d2d] ${context}`, error);
}

/** Global ErrorHandler that forwards unhandled errors to `reportError`. */
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    reportError('unhandled', error);
  }
}
