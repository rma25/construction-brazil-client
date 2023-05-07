import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Toast } from '../interface/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toasts = new Subject<Toast>();
}
