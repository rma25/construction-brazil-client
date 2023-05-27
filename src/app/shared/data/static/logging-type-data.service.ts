import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingType } from 'src/app/admin-module/profissionais-de-rodeio/interfaces/logging-type.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggingTypeDataService {
  private readonly controller: string = 'LoggingType';

  constructor(private http: HttpClient) {}

  public get(): Observable<Array<LoggingType>> {
    return this.http
      .get<Array<LoggingType>>(`${environment.constructionBrazilServerUri}/${this.controller}`)
      .pipe(catchError(() => of(new Array<LoggingType>())));
  }
}
