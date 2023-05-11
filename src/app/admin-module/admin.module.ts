import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio/profissionais-de-rodeio.component';
import { ProfissionaisDeRodeioRowComponent } from './profissionais-de-rodeio/profissionais-de-rodeio-row/profissionais-de-rodeio-row.component';
import { CadastroComponent } from './profissionais-de-rodeio/cadastro/cadastro.component';
import { EnderecoComponent } from './profissionais-de-rodeio/cadastro/endereco/endereco.component';
import { ContatoComponent } from './profissionais-de-rodeio/cadastro/contato/contato.component';
import { InformacoesGeraisComponent } from './profissionais-de-rodeio/cadastro/informacoes-gerais/informacoes-gerais.component';

@NgModule({
  declarations: [ProfissionaisDeRodeioComponent, AdminMenuComponent, ProfissionaisDeRodeioRowComponent, CadastroComponent, EnderecoComponent, ContatoComponent, InformacoesGeraisComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {
  constructor() {}
}
