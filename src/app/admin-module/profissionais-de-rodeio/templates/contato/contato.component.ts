import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AdminContato } from '../../models/admin-contato.model';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent {
  @Input() adminContato!: AdminContato;
  @Output() adminContatoChange = new EventEmitter<AdminContato>();

  constructor() {}
}
