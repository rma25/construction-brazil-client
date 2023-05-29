import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Sexo } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/sexo.interface';

import { SexoDataService } from '../../data/static/sexo-data.service';

@Injectable({ providedIn: 'root' })
export class SexoService {
  private sexos: Array<Sexo> = new Array<Sexo>();

  constructor(private sexoData: SexoDataService) {
    this.sexoData
      .get()
      .pipe(take(1))
      .subscribe((sexos) => (this.sexos = sexos));
  }

  public getSexos(): Array<Sexo> {
    return this.sexos.slice();
  }
}
