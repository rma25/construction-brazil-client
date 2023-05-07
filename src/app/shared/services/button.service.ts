import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ButtonService {
  constructor() {}

  public getErrorButtonClass(): string {
    return 'btn btn-danger';
  }

  public getErrorButtonIcon(): string {
    return 'ban';
  }

  public getSaveButtonStyleControl(): FormControl {
    const saveButtonControl = new FormControl(this.getDefaultSaveButtonStyle());

    return saveButtonControl;
  }

  public getSaveButtonClassControl(): FormControl {
    const saveButtonControl = new FormControl(this.getDefaultSaveButtonClass());

    return saveButtonControl;
  }

  public getSaveButtonIconControl(): FormControl {
    const saveButtonControl = new FormControl(this.getSaveButtonIcon(false));

    return saveButtonControl;
  }

  public getSaveButtonTextControl(): FormControl {
    const saveButtonControl = new FormControl('Save');

    return saveButtonControl;
  }

  public getSaveButtonIcon(isSaved: boolean, isError: boolean = false): string {
    let icon = 'save';

    if (isError) {
      icon = 'ban';
    } else {
      icon = isSaved ? 'check' : 'save';
    }

    return icon;
  }

  public getSaveButtonStyle(isSaved: boolean, isError: boolean = false): {} {
    let style = {};

    if (isError) {
      style = {
        color: '#fff',
        'background-color': '#dc3545',
        'border-color': '#dc3545'
      };
    } else {
      if (isSaved) {
        style = {
          color: '#fff',
          'background-color': '#28a745',
          'border-color': '#28a745'
        };
      } else {
        // Changed
        style = {
          color: '#212529',
          'background-color': '#ffc107',
          'border-color': '#ffc107'
        };
      }
    }

    return style;
  }

  public getDefaultSaveButtonStyle(): {} {
    return {
      color: '#fff',
      'background-color': '#007bff',
      'border-color': '#007bff'
    };
  }

  public getSaveButtonClass(isSaved: boolean, isError: boolean = false): string {
    let saveBtnClass = 'btn btn-primary';

    if (isError) {
      saveBtnClass = 'btn btn-danger';
    } else {
      if (isSaved) {
        saveBtnClass = 'btn btn-success';
      } else {
        // Changed
        saveBtnClass = 'btn btn-warning';
      }
    }

    return saveBtnClass;
  }

  public getDefaultSaveButtonClass(): string {
    return 'btn btn-primary';
  }
}
