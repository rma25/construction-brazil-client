import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-abstract-base',
  templateUrl: './abstract-base.component.html',
  styleUrls: ['./abstract-base.component.css'],
})
export class AbstractBaseComponent implements OnDestroy {
  protected destroy = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
