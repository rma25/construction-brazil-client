import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estado } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/estado.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EstadoDataService {
  constructor(private http: HttpClient) {}

  public get(): Observable<Array<Estado>> {
    return this.http
      .get<Array<Estado>>(`${environment.constructionBrazilServerUri}`)
      .pipe(catchError(() => of(new Array<Estado>())));
  }


}
