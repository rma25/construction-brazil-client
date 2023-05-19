import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ExternalCepInfo } from '../interfaces/external-cep-info.interface';

@Injectable({ providedIn: 'root' })
export class ExternalCepDataService {
  constructor(private http: HttpClient) {}

  public getCepInfo(
    cep: string
  ): Observable<ExternalCepInfo> {
    return this.http
      .get<ExternalCepInfo>(
        `${environment.preCepUri}${cep}${environment.postCepUri}`
      )
      .pipe(catchError(() => of({ erro: true } as ExternalCepInfo)));
  }
}
