import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';

import { DialogComponent } from '../dialog.component';
import { DialogMessages } from '../enums/dialog-messages';
import { DialogTitles } from '../enums/dialog-titles';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private modalService: NgbModal) {}

  public displayModal(
    message: DialogMessages | string,
    modalHeaderTitle: DialogTitles | string,
    showYesOrNoButtons: boolean
  ): Observable<any> {
    const modal = this.modalService.open(DialogComponent, { centered: true });
    const modalComp = <DialogComponent>modal.componentInstance;
    modalComp.message = message;
    modalComp.modalHeaderTitle = modalHeaderTitle;
    modalComp.showYesOrNoButtons = showYesOrNoButtons;

    return from(modal.result);
  }
}
