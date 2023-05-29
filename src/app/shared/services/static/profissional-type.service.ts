import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ProfissionalType } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/profissional-type.interface';

import { ProfissionalTypeDataService } from '../../data/static/profissional-type-data.service';

@Injectable({ providedIn: 'root' })
export class ProfissionalTypeService {
  private profissionalTypes: Array<ProfissionalType> =
    new Array<ProfissionalType>();

  constructor(private profissionalTypeData: ProfissionalTypeDataService) {
    this.profissionalTypeData
      .get()
      .pipe(take(1))
      .subscribe(
        (profissionalTypes) => (this.profissionalTypes = profissionalTypes)
      );
  }

  public getDdds(): Array<ProfissionalType> {
    return this.profissionalTypes.slice();
  }
}
