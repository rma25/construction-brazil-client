import { Injectable } from '@angular/core';

import { BtnClass } from '../enums/btn-class.enum';
import { BtnState } from '../enums/btn-state.enum';

@Injectable({ providedIn: 'root' })
export class ButtonService {
  constructor() {}

  public getButtonClass(state: BtnState): string {
    // Default
    // Default
    let btnClass = BtnClass.DEFAULT;

    if (state === BtnState.DEFAULT_INACTIVE) {
      btnClass = BtnClass.DEFAULT_INACTIVE;
    } else if (state === BtnState.ERROR) {
      btnClass = BtnClass.ERROR;
    } else if (state === BtnState.CHANGED) {
      btnClass = BtnClass.CHANGED;
    } else if (state === BtnState.CHANGED_INACTIVE) {
      btnClass = BtnClass.CHANGED_INACTIVE;
    } else if (state === BtnState.CHANGED_ACTIVE) {
      btnClass = BtnClass.CHANGED_ACTIVE;
    }

    return btnClass;
  }
}
