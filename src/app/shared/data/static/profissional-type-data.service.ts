import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfissionalType } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/profissional-type.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfissionalTypeDataService {
  private readonly controller: string = 'ProfissionalType';

  constructor(private http: HttpClient) {}

  public get(): Observable<Array<ProfissionalType>> {
    return this.http
      .get<Array<ProfissionalType>>(
        `${environment.constructionBrazilServerUri}/${this.controller}`
      )
      .pipe(catchError(() => of(new Array<ProfissionalType>())));
  }
}
