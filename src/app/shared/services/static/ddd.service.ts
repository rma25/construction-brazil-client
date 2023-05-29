import { Injectable } from '@angular/core';
import { shareReplay, take } from 'rxjs';
import { Ddd } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/ddd.interface';

import { DddDataService } from '../../data/static/ddd-data.service';

@Injectable({ providedIn: 'root' })
export class DddService {
  private ddds: Array<Ddd> = new Array<Ddd>();

  constructor(private dddData: DddDataService) {
    this.dddData
      .get()
      .pipe(take(1), shareReplay(1))
      .subscribe((ddds) => (this.ddds = ddds));
  }

  public getDdds(): Array<Ddd> {
    return this.ddds.slice();
  }
}
