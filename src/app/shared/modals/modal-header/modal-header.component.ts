import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css'],
})
export class ModalHeaderComponent {
  @Input() title: string;

  public logo: Observable<SafeUrl | null | undefined>;

  constructor(private modal: NgbModal) {}

  public closeModals() {
    this.modal.dismissAll();
  }
}
