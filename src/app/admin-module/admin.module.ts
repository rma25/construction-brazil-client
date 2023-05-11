import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CadastroComponent } from './profissionais-de-rodeio/cadastro/cadastro.component';
import {
  ProfissionaisDeRodeioRowComponent,
} from './profissionais-de-rodeio/profissionais-de-rodeio-row/profissionais-de-rodeio-row.component';
import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio/profissionais-de-rodeio.component';
import { ContatoComponent } from './profissionais-de-rodeio/templates/contato/contato.component';
import { EnderecoComponent } from './profissionais-de-rodeio/templates/endereco/endereco.component';
import {
  InformacoesGeraisComponent,
} from './profissionais-de-rodeio/templates/informacoes-gerais/informacoes-gerais.component';
import { EditAdminContatoComponent } from './profissionais-de-rodeio/edit-admin-contato/edit-admin-contato.component';
import { EditAdminEnderecoComponent } from './profissionais-de-rodeio/edit-admin-endereco/edit-admin-endereco.component';
import { EditAdminInformacoesGeraisComponent } from './profissionais-de-rodeio/edit-admin-informacoes-gerais/edit-admin-informacoes-gerais.component';

@NgModule({
  declarations: [
    ProfissionaisDeRodeioComponent,
    AdminMenuComponent,
    ProfissionaisDeRodeioRowComponent,
    CadastroComponent,
    EnderecoComponent,
    ContatoComponent,
    InformacoesGeraisComponent,
    EditAdminContatoComponent,
    EditAdminEnderecoComponent,
    EditAdminInformacoesGeraisComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {
  constructor() {}
}
