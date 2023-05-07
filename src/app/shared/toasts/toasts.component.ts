import { Component, OnInit } from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil } from 'rxjs';
import { AbstractBaseComponent } from 'src/app/abstract-base/abstract-base.component';

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
  public filteredToasts: { timer: ToastTimer; toast: Toast }[] = [];

  constructor(public toastService: ToastService) {
    super();
  }

  ngOnInit() {
    this.toastService.toasts
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
  }): IconName {
    if (filteredToast.toast.httpStatusCode === 500) return 'bug';
    else if (filteredToast.toast.isDanger || filteredToast.toast.isWarning)
      return 'exclamation-triangle';
    else return 'check';
  }

  public getToastIconClass(filteredToast: {
    timer: ToastTimer;
    toast: Toast;
  }): string {
    if (filteredToast.toast.isDanger || filteredToast.toast.isWarning)
      return 'text-warning';
    else if (!filteredToast.toast.isDanger && !filteredToast.toast.isWarning)
      return 'text-success';
    else if (filteredToast.toast.httpStatusCode === 500) return 'text-danger';
    else return '';
  }
}
