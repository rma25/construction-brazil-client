import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

import { AdminContato } from '../models/admin-contato.model';

@Component({
  selector: 'app-edit-admin-contato',
  templateUrl: './edit-admin-contato.component.html',
  styleUrls: ['./edit-admin-contato.component.css'],
})
export class EditAdminContatoComponent {
  @Input() adminContato!: AdminContato;
  @Output() adminContatoChange = new EventEmitter<AdminContato>();

  @Output() isFormValid = new EventEmitter<boolean>();

  public valid: boolean = true;

  constructor(public modalService: ModalService) {}

  public isValid(isFormValid: boolean): void {
    this.valid = isFormValid;

    this.isFormValid.emit(isFormValid);
  }
}
