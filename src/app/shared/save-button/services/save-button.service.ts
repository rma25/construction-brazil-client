import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SaveButtonService {
  public reset: Observable<void> = new Subject<void>();

  public resetSaveButton(): void {
    (this.reset as Subject<void>).next();
  }

  constructor() {}
}
