import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio/profissionais-de-rodeio.component';

@NgModule({
  declarations: [ProfissionaisDeRodeioComponent],
  imports: [SharedModule],
})
export class AdminModule {
  constructor(public faLib: FaIconLibrary) {}
}
