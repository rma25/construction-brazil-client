import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ToastService } from './shared/toasts/services/toast.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(
      request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
        },
      })
    );
  }
}
