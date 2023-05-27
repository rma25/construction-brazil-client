import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Estado } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/estado.interface';

import { EstadoDataService } from '../data/static/estado-data.service';


@Injectable({ providedIn: 'root' })
export class EstadoService {
  private estados: Array<Estado> = new Array<Estado>();

  constructor(private estadoDataService: EstadoDataService) {
    this.estadoDataService
      .get()
      .pipe(take(1))
      .subscribe((estados) => (this.estados = estados));
  }

  public getEstados(): Array<Estado> {
    return this.estados.slice();
  }

  public findEstadoIdFor(uf: string): number {
    if (!this.estados || this.estados.length === 0 || !uf || uf.length === 0)
      return 0;

    const estadoFound = this.estados.find(
      (x) => x.uf.toLocaleLowerCase() === uf.toLocaleLowerCase()
    );

    if (!estadoFound) return 0;

    return estadoFound.id;
  }

  public find(id: number): Estado | undefined {
    return this.estados.find((x) => x.id === id);
  }
}
