import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { LoggingType } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/logging-type.interface';

import { LoggingTypeDataService } from '../../data/static/logging-type-data.service';

@Injectable({ providedIn: 'root' })
export class LoggingTypeService {
  private loggingTypes: Array<LoggingType> = new Array<LoggingType>();

  constructor(private loggingTypeData: LoggingTypeDataService) {
    this.loggingTypeData
      .get()
      .pipe(take(1))
      .subscribe((loggingTypes) => (this.loggingTypes = loggingTypes));
  }

  public getLoggingTypes(): Array<LoggingType> {
    return this.loggingTypes.slice();
  }
}
