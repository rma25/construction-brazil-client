import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  public closeModal(): void {
    this.ngbModal.dismissAll();
  }

  public openModalXL(template: TemplateRef<any>) {
    this.ngbModal.open(template, { centered: true, size: 'xl' });
  }

  public openModalComponent(component: any, options?: NgbModalOptions): Promise<any>{
    return this.ngbModal.open(component, options).result
  }

}
