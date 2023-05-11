import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StaticDataService } from 'src/app/shared/services/static-data.service';

import { AdminEndereco } from '../../models/admin-endereco.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent {
  @Input() adminEndereco!: AdminEndereco;
  @Output() adminEnderecoChange =
  new EventEmitter<AdminEndereco>();

  public estados = new Array<string>();

  constructor(private staticDataService: StaticDataService) {
    this.estados = this.staticDataService.getEstados();
   }
}
