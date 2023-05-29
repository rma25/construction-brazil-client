import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ContatoAdminDataService {
  private readonly controller = 'contato';

  constructor(private http: HttpClient) {}

  public isCpfUnique(cpf: string): Observable<boolean> {
    return this.http
      .get<boolean>(
        `${environment.constructionBrazilServerUri}/${this.controller}/cpf/${cpf}/IsCpfUnique`
      )
      .pipe(catchError(() => of(false)));
  }
}
