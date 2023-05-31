import { Injectable } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject } from 'rxjs';

import { ToastBgClass } from '../enums/toast-bg-class.enum';
import { ToastIcon } from '../enums/toast-icon.enum';
import { ToastTextClass } from '../enums/toast-text-class.enum';
import { ToastType } from '../enums/toast-type.enum';
import { Toast } from '../interface/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSource = new BehaviorSubject<Toast | undefined>(undefined);

  public toasts = this.toastSource.asObservable();

  public triggerToast(toast: Toast): void {
    this.toastSource.next(toast);
  }

  public getToastIcon(type: ToastType): IconName {
    if (type === ToastType.BUG) return ToastIcon.BUG;
    else if (type === ToastType.ERROR) return ToastIcon.ERROR;
    else if (type === ToastType.WARNING) return ToastIcon.WARNING;
    else if (type === ToastType.SUCCESS) return ToastIcon.SUCCESS;
    else return ToastIcon.SUCCESS;
  }

  public getToastTextClass(type: ToastType): string {
    if (type === ToastType.BUG) return ToastTextClass.BUG;
    else if (type === ToastType.ERROR) return ToastTextClass.ERROR;
    else if (type === ToastType.WARNING) return ToastTextClass.WARNING;
    else if (type === ToastType.SUCCESS) return ToastTextClass.SUCCESS;
    else return ToastTextClass.SUCCESS;
  }

  public getToastBgClass(type: ToastType): string {
    if (type === ToastType.BUG) return ToastBgClass.BUG;
    else if (type === ToastType.ERROR) return ToastBgClass.ERROR;
    else if (type === ToastType.WARNING) return ToastBgClass.WARNING;
    else if (type === ToastType.SUCCESS) return ToastBgClass.SUCCESS;
    else return ToastBgClass.SUCCESS;
  }
}
