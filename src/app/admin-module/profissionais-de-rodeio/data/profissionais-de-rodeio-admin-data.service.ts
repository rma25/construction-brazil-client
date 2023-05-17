import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AdminProfissionalDeRodeio } from '../models/admin-profissional-de-rodeio.model';
import { ProfissionalAdminFilter } from '../models/profissional-de-rodeio-admin-filter';

@Injectable({ providedIn: 'root' })
export class ProfissionaisDeRodeioAdminDataService {
  constructor(private http: HttpClient) {}

  public getPageAdmin(
    filter: ProfissionalAdminFilter
  ): Observable<AdminProfissionalDeRodeio[]> {
    return this.http
      .post<AdminProfissionalDeRodeio[]>(
        `${environment.constructionBrazilServerUri}/ProfissionaisDeRodeio/GetPageAdmin`,
        JSON.stringify(filter)
      )
      .pipe(catchError(() => of(new Array<AdminProfissionalDeRodeio>())));
  }

  public getTotalAdmin(filter: ProfissionalAdminFilter): Observable<number> {
    return this.http
      .post<number>(
        `${environment.constructionBrazilServerUri}/ProfissionaisDeRodeio/GetTotalAdmin`,
        JSON.stringify(filter)
      )
      .pipe(catchError(() => of(0)));
  }

  public insert(profissional: AdminProfissionalDeRodeio): Observable<number> {
    return this.http
      .post<number>(
        `${environment.constructionBrazilServerUri}/ProfissionaisDeRodeio/Insert`,
        JSON.stringify(profissional)
      )
      .pipe(catchError(() => of(0)));
  }

  public update(profissional: AdminProfissionalDeRodeio): Observable<boolean> {
    return this.http
      .post<boolean>(
        `${environment.constructionBrazilServerUri}/ProfissionaisDeRodeio/Update`,
        JSON.stringify(profissional)
      )
      .pipe(catchError(() => of(false)));
  }

  public delete(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.constructionBrazilServerUri}/ProfissionaisDeRodeio/id/${id}/Delete`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(catchError(() => of(false)));
  }
}
