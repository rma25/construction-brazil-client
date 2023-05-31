import { Component, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { ToastType } from './enums/toast-type.enum';
import { Toast } from './interface/toast.interface';
import { ToastService } from './services/toast.service';

class ToastTimer {
  constructor(timeLeft: number) {
    this.timeLeft = timeLeft;
  }
  public timeLeft: number;

  // This is so we can clear it later
  public interval: any;
}

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent extends AbstractBaseComponent implements OnInit {
  public filteredToasts = new Array<{ timer: ToastTimer; toast: Toast }>();
  public warningType: ToastType.WARNING = ToastType.WARNING;
  public errorType: ToastType.ERROR = ToastType.ERROR;

  constructor(public toastService: ToastService) {
    super();
  }

  ngOnInit() {
    this.toastService.toasts
      .pipe(
        filter((toast) => !!toast),
        map((toast) => {
          if (toast) {
            const timer = new ToastTimer(
              // Initial progress bar value 100%
              100
            );
            2;
            return { timer, toast };
          } else {
            return undefined;
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe((filteredToast) => {
        if (filteredToast) {
          this.filteredToasts.push(filteredToast);

          // Start countdown for progress bar
          this.filteredToasts.forEach((x) => {
            x.timer.interval = setInterval(() => {
              if (x.timer.timeLeft > 0) {
                // Seconds = Delay / 1000
                // ProgressBar Percentage = 100(%) / Seconds
                x.timer.timeLeft -= 100 / (x.toast.delay / 1000);
              }
            }, 1000);
          });
        }
      });
  }

  public onHideToast(toastInfo: { timer: ToastTimer; toast: Toast }): void {
    // Clear interval set when created (for progress bar)
    clearInterval(toastInfo.timer.interval);

    // Remove toast from array
    this.filteredToasts = this.filteredToasts.filter(
      (filteredToast) => filteredToast !== toastInfo
    );
  }
}
