import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Classificacao } from '../enums/classificacao.enum';
import { Status } from '../enums/status.enum';

@Injectable({ providedIn: 'root' })
export class InformacoesGeraisService {
  private isSindicalizadoSource = new BehaviorSubject<boolean>(false);
  public isSindicalizado = this.isSindicalizadoSource.asObservable();

  constructor() {}

  public updateContatoSindicalizado(isSindicalizado: boolean): void {
    this.isSindicalizadoSource.next(isSindicalizado);
  }

  public getClassificacao(isSindicalizado: boolean): string{
    return isSindicalizado ? Classificacao.SINDICALIZADO : Classificacao.INSCRICAO;
  }

  public getStatus(ativo: boolean): string{
    return ativo ? Status.ATIVO : Status.INATIVO;
  }
}
