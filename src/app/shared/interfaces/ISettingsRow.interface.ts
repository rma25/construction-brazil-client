import { EventEmitter } from '@angular/core';

import { SaveBtnState } from '../save-button/enums/save-btn-state.enum';
import { RowInfo } from './rowInfo.interface';

export interface ISettingsRow {
  rowChange: EventEmitter<RowInfo>;
  deletedId: EventEmitter<number>;

  isRowValid(): boolean;
  onDelete?(): void;
  onUpdateSaveBtn(state: SaveBtnState): void;
}
