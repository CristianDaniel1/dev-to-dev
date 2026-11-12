import { type ErrorHandler, Injectable } from '@angular/core';
import { reportError } from '../lib/report-error';

/** Global ErrorHandler that forwards unhandled errors to `reportError`. */
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  /**
   * Reports an error that nothing else caught.
   *
   * @param error - The unhandled error.
   */
  handleError(error: unknown): void {
    reportError('unhandled', error);
  }
}
