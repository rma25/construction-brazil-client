import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private refreshErrorMessage: string | undefined;

  public setRefreshErrorMessage(message: string | undefined) {
    this.refreshErrorMessage = message;
  }

  public getRefreshErrorMessage(): string | undefined {
    return this.refreshErrorMessage;
  }

}
