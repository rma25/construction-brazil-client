import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AdminProfissionalDeRodeio } from '../../models/admin-profissional-de-rodeio.model';
import { InformacoesGeraisService } from '../services/informacoes-gerais.service';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css'],
})
export class InformacoesGeraisComponent {
  @Input() adminProfissional!: AdminProfissionalDeRodeio;
  @Output() adminProfissionalChange =
    new EventEmitter<AdminProfissionalDeRodeio>();

  constructor(private informacoesGeraisService: InformacoesGeraisService) {}

  public onSindicalizadoChange(isSindicalizado: boolean): void {
    this.informacoesGeraisService.updateContatoSindicalizado(isSindicalizado);
  }
}
