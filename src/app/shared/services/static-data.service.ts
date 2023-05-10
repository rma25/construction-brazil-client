import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StaticDataService {
  private estados: Array<string> = new Array<string>();

  constructor() {
    this.setup();
  }

  private setup(): void {
    this.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  }

  public getEstados(): Array<string> {
    return this.estados.slice();
  }
}
