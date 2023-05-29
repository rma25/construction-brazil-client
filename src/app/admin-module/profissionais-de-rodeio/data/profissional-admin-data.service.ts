import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AdminProfissional as AdminProfissional } from '../models/admin-profissional.model';
import { ProfissionalAdminFilter } from '../models/profissional-de-rodeio-admin-filter';

@Injectable({ providedIn: 'root' })
export class ProfissionalAdminDataService {
  private readonly controller = 'profissional';

  constructor(private http: HttpClient) {}

  public getAdminPage(
    filter: ProfissionalAdminFilter
  ): Observable<AdminProfissional[]> {
    return this.http
      .post<AdminProfissional[]>(
        `${environment.constructionBrazilServerUri}/${this.controller}/GetAdminPage`,
        JSON.stringify(filter)
      )
      .pipe(catchError(() => of(new Array<AdminProfissional>())));
  }

  public getAdminTotal(filter: ProfissionalAdminFilter): Observable<number> {
    return this.http
      .post<number>(
        `${environment.constructionBrazilServerUri}/${this.controller}/GetAdminTotal`,
        JSON.stringify(filter)
      )
      .pipe(catchError(() => of(0)));
  }

  public insert(profissional: AdminProfissional): Observable<number> {
    return this.http
      .post<number>(
        `${environment.constructionBrazilServerUri}/${this.controller}/Insert`,
        JSON.stringify(profissional)
      )
      .pipe(catchError(() => of(0)));
  }

  public update(profissional: AdminProfissional): Observable<boolean> {
    return this.http
      .post<boolean>(
        `${environment.constructionBrazilServerUri}/${this.controller}/Update`,
        JSON.stringify(profissional)
      )
      .pipe(catchError(() => of(false)));
  }

  public delete(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(
        `${environment.constructionBrazilServerUri}/${this.controller}/id/${id}/Delete`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .pipe(catchError(() => of(false)));
  }
}
