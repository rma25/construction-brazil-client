import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AdminWorker } from '../models/admin/admin-worker.model';

@Injectable({ providedIn: "root" })
export class DocumentGroupDataService {
  constructor(public http: HttpClient) {}

  public insert(worker: AdminWorker): Observable<number> {
    return this.http
      .post<number>(`${environment.constructionBrazilServerUri}/Worker/Insert`, JSON.stringify(worker))
      .pipe(catchError(() => of(0)));
  }
}
