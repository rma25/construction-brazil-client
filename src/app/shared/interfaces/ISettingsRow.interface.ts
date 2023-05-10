import { EventEmitter } from '@angular/core';

import { RowInfo } from './rowInfo.interface';

export interface ISettingsRow {
  rowChange: EventEmitter<RowInfo>;
  deletedId: EventEmitter<number>;

  isRowValid(): boolean;
  onDelete?(): void;
  onUpdateSaveBtn(isSaved: boolean, isValid: boolean): void;
  onUpdateSaveBtn(isSaved: boolean): void;
}
