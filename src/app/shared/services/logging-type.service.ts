import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { LoggingType } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/logging-type.interface';

import { LoggingTypeDataService } from '../data/static/logging-type-data.service';

@Injectable({ providedIn: 'root' })
export class ProfissionalTypeService {
  private profissionalTypes: Array<LoggingType> = new Array<LoggingType>();

  constructor(private loggingTypeData: LoggingTypeDataService) {
    this.loggingTypeData
      .get()
      .pipe(take(1))
      .subscribe((profissionalTypes) => (this.profissionalTypes = profissionalTypes));
  }

  public getDdds(): Array<LoggingType> {
    return this.profissionalTypes.slice();
  }
}
