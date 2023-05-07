import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio/profissionais-de-rodeio.component';
import { ProfissionaisDeRodeioRowComponent } from './profissionais-de-rodeio/profissionais-de-rodeio-row/profissionais-de-rodeio-row.component';

@NgModule({
  declarations: [ProfissionaisDeRodeioComponent, AdminMenuComponent, ProfissionaisDeRodeioRowComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {
  constructor() {}
}
