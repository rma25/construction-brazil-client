import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

import { AdminProfissionalDeRodeio } from '../models/admin-profissional-de-rodeio.model';

@Component({
  selector: 'app-edit-admin-informacoes-gerais',
  templateUrl: './edit-admin-informacoes-gerais.component.html',
  styleUrls: ['./edit-admin-informacoes-gerais.component.css'],
})
export class EditAdminInformacoesGeraisComponent {
  @Input() adminProfissional!: AdminProfissionalDeRodeio;
  @Output() adminProfissionalChange =
    new EventEmitter<AdminProfissionalDeRodeio>();

  @Output() isFormValid = new EventEmitter<boolean>();

  public valid: boolean = true;

  constructor(public modalService: ModalService) {}

  public isValid(isValid: boolean): void {
    this.valid = isValid;

    this.isFormValid.emit(isValid);
  }
}
