import { Injectable } from '@angular/core';

import { SaveBtnClass } from '../enums/save-btn-class.enum';
import { SaveBtnIcon } from '../enums/save-btn-icon.enum';
import { SaveBtnState } from '../enums/save-btn-state.enum';
import { SaveBtnText } from '../enums/save-btn-text.enum';

@Injectable({ providedIn: 'root' })
export class SaveButtonService {
  constructor() {}

  public getSaveButtonIcon(state: SaveBtnState): string {
    let icon = SaveBtnIcon.DEFAULT;

    if (state === SaveBtnState.ERROR) {
      icon = SaveBtnIcon.ERROR;
    } else if (state === SaveBtnState.SAVED) {
      icon = SaveBtnIcon.SAVED;
    }

    return icon;
  }

  public getSaveButtonStyle(state: SaveBtnState): {} {
    let style = {};

    if (state === SaveBtnState.ERROR) {
      style = {
        color: '#fff',
        'background-color': '#dc3545',
        'border-color': '#dc3545',
      };
    } else if (state === SaveBtnState.SAVED) {
      style = {
        color: '#fff',
        'background-color': '#28a745',
        'border-color': '#28a745',
      };
    } else if (state === SaveBtnState.CHANGED) {
      // Changed
      style = {
        color: '#212529',
        'background-color': '#ffc107',
        'border-color': '#ffc107',
      };
    } else {
      // Default
      style = this.getDefaultSaveButtonStyle();
    }

    return style;
  }

  public getDefaultSaveButtonStyle(): {} {
    return {
      color: '#fff',
      'background-color': '#007bff',
      'border-color': '#007bff',
    };
  }

  public getSaveButtonClass(state: SaveBtnState): string {
    // Default
    let saveBtnClass = SaveBtnClass.DEFAULT;

    if (state === SaveBtnState.ERROR) {
      saveBtnClass = SaveBtnClass.ERROR;
    } else if (state === SaveBtnState.CHANGED) {
      saveBtnClass = SaveBtnClass.CHANGED;
    } else if (state === SaveBtnState.SAVED) {
      saveBtnClass = SaveBtnClass.SAVED;
    }

    return saveBtnClass;
  }

  public getSaveButtonText(state: SaveBtnState): string {
    // Default
    let saveBtnText = SaveBtnText.DEFAULT;

    if (state === SaveBtnState.ERROR) {
      saveBtnText = SaveBtnText.ERROR;
    } else if (state === SaveBtnState.CHANGED) {
      saveBtnText = SaveBtnText.CHANGED;
    } else if (state === SaveBtnState.SAVED) {
      saveBtnText = SaveBtnText.SAVED;
    }

    return saveBtnText;
  }
}
