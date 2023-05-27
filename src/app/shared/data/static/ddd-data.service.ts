import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ddd } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/ddd.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DddDataService {
  private readonly controller: string = 'Ddd';

  constructor(private http: HttpClient) {}

  public get(): Observable<Array<Ddd>> {
    return this.http
      .get<Array<Ddd>>(`${environment.constructionBrazilServerUri}/${this.controller}`)
      .pipe(catchError(() => of(new Array<Ddd>())));
  }
}
