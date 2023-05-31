import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ToastType } from './shared/toasts/enums/toast-type.enum';
import { ToastService } from './shared/toasts/services/toast.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
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
          if (event.type === 0) {
            this.toastService.triggerToast({
              httpStatusCode: 0,
              header: ToastType.ERROR,
              body: 'Não foi possível acessar o servidor.',
              delay: 3000,
              type: ToastType.ERROR,
            });
          } else if (event instanceof HttpResponse && event.status !== 200) {
            debugger;

            if (event.status === 0) {
              this.toastService.triggerToast({
                httpStatusCode: event.status,
                header: ToastType.ERROR,
                body: 'Não foi possível acessar o servidor.',
                delay: 3000,
                type: ToastType.ERROR,
              });
            } else if (event.status === 500) {
              this.toastService.triggerToast({
                httpStatusCode: event.status,
                header: ToastType.BUG,
                body: 'Algo deu errado. Por favor entre em contato com o administrador.',
                delay: 3000,
                type: ToastType.BUG,
              });
            }
          }
        })
      );
  }
}
