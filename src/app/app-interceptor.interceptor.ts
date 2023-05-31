import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ToastTimer } from './shared/toasts/enums/toast-timer.enum';
import { ToastType } from './shared/toasts/enums/toast-type.enum';
import { ToastService } from './shared/toasts/services/toast.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private isServerClosed: boolean = false;

  constructor(private toastService: ToastService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(
        request.clone({
          setHeaders: {
            Accept: `application/json`,
            'Content-Type': `application/json`,
          },
        })
      )
      .pipe(
        tap((event) => {
          if (event instanceof HttpResponse && event.status !== 200) {
            if (!this.isServerClosed && event.status === 0) {
              this.toastService.triggerToast({
                httpStatusCode: event.status,
                header: ToastType.ERROR,
                body: 'Não foi possível acessar o servidor.',
                delay: ToastTimer.DEFAULT,
                type: ToastType.ERROR,
              });

              this.isServerClosed = true;
            } else if (event.status === 500) {
              this.toastService.triggerToast({
                httpStatusCode: event.status,
                header: ToastType.BUG,
                body: 'Algo deu errado. Por favor entre em contato com o administrador.',
                delay: ToastTimer.DEFAULT,
                type: ToastType.BUG,
              });

              this.isServerClosed = false;
            } else {
              this.isServerClosed = false;
            }
          }
        })
      );
  }
}
