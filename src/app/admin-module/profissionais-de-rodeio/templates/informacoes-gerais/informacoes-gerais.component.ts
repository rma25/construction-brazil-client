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

  @Output() isValid = new EventEmitter<boolean>(false);

  constructor(private informacoesGeraisService: InformacoesGeraisService) {}

  public onSindicalizadoChange(isSindicalizado: boolean): void {
    this.informacoesGeraisService.updateContatoSindicalizado(isSindicalizado);
  }

  public onChange(): void {
    /*
     * This will always be true for now since none of the fields are required.
     * In case it changes in the future I will follow the same pattern as the other components
     */
    this.isValid.emit(true);
  }
}
