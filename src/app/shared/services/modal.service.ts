import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  public closeModal(): void {
    this.ngbModal.dismissAll();
  }
}
