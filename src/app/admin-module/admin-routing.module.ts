import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio/profissionais-de-rodeio.component';

const routes: Routes = [
  { path: '', component: AdminMenuComponent},
  { path: 'profissionais-de-rodeio', component: ProfissionaisDeRodeioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
