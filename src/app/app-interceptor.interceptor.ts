import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ToastService } from './shared/toasts/services/toast.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe();
    /**
     * Handle newly created request with updated header (if given)
     */
    // return next.handle(req).pipe(
    //   tap((event: HttpResponse<any>) => {
    //     /**
    //      * Sucessfull Http Response Time.
    //      */
    //   }, (error: HttpErrorResponse) => {
    //     let errorMessage =
    //       'Ops! Something went wrong...Please contact administrator.';
    //     // This happens when the server is offline (not running)
    //     if (error.status === 0) {
    //       errorMessage = 'Unable to reach the server.';
    //     } else if (
    //       error.error !== null &&
    //       error.error !== undefined &&
    //       typeof error.error === 'string' &&
    //       (error.error + '').length > 0
    //     ) {
    //       errorMessage = error.error + '';
    //     } else if (error.message) {
    //       errorMessage = error.message;
    //     } else if (
    //       error.error.title !== null &&
    //       error.error.title !== undefined &&
    //       (error.error.title + '').length > 0
    //     ) {
    //       errorMessage = error.error.title + '';
    //     } else if (
    //       error.message !== null &&
    //       error.message !== undefined &&
    //       error.message.length > 0
    //     ) {
    //       errorMessage = error.message;
    //     }
    //     // Notify the user something happened
    //     if (!error.url) {
    //       this.toastService.toasts.next({
    //         httpStatusCode: error.status,
    //         header: error.statusText,
    //         body: errorMessage,
    //         delay: 5000,
    //         isDanger: true,
    //       });
    //     }
    //   })
    // );
  }
}
