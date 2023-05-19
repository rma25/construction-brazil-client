import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

import { AdminEndereco } from '../models/admin-endereco.model';

@Component({
  selector: 'app-edit-admin-endereco',
  templateUrl: './edit-admin-endereco.component.html',
  styleUrls: ['./edit-admin-endereco.component.css'],
})
export class EditAdminEnderecoComponent {
  @Input() profissionalNomeCompleto!: string;

  @Input() adminEndereco!: AdminEndereco;
  @Output() adminEnderecoChange = new EventEmitter<AdminEndereco>();

  public isValid: boolean;

  constructor(public modalService: ModalService) {}
}
