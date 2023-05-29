import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

import { AdminProfissional } from '../models/admin-profissional.model';

@Component({
  selector: 'app-edit-admin-informacoes-gerais',
  templateUrl: './edit-admin-informacoes-gerais.component.html',
  styleUrls: ['./edit-admin-informacoes-gerais.component.css'],
})
export class EditAdminInformacoesGeraisComponent {
  @Input() adminProfissional!: AdminProfissional;
  @Output() adminProfissionalChange =
    new EventEmitter<AdminProfissional>();

  @Output() isFormValid = new EventEmitter<boolean>();

  public valid: boolean = true;

  constructor(public modalService: ModalService) {}

  public isValid(isValid: boolean): void {
    this.valid = isValid;

    this.isFormValid.emit(isValid);
  }
}
