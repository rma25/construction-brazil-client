import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sexo } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/sexo.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SexoDataService {
  constructor(private http: HttpClient) {}

  public get(): Observable<Array<Sexo>> {
    return this.http
      .get<Array<Sexo>>(`${environment.constructionBrazilServerUri}`)
      .pipe(catchError(() => of(new Array<Sexo>())));
  }
}
