import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AdminProfissionalDeRodeio } from '../../models/admin-profissional-de-rodeio.model';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css'],
})
export class InformacoesGeraisComponent {
  @Input() adminProfissional!: AdminProfissionalDeRodeio;
  @Output() adminProfissionalChange =
    new EventEmitter<AdminProfissionalDeRodeio>();

  constructor() {}
}
