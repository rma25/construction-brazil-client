import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

import { Toast } from './models/toast.model';
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
  public filteredToasts: { timer: ToastTimer; toast: Toast }[] = [];

  constructor(public sharedService: ToastService) {
    super();
  }

  ngOnInit() {
    this.sharedService.toasts
      .pipe(
        map((toast, i) => {
          const timer = new ToastTimer(
            // Initial progress bar value 100%
            100
          );

          return { timer, toast };
        }),
        takeUntil(this.destroy)
      )
      .subscribe((filteredToasts) => {
        if (filteredToasts) {
          this.filteredToasts.push(filteredToasts);

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

  public getToastIcon(filteredToast: {
    timer: ToastTimer;
    toast: Toast;
  }): string {
    return filteredToast.toast.httpStatusCode === 500
      ? 'bug'
      : filteredToast.toast.isDanger || filteredToast.toast.isWarning
      ? 'exclamation-triangle'
      : 'check';
  }
}
