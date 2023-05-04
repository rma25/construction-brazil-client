import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WorkersComponent } from './workers/workers.component';

@NgModule({
  declarations: [WorkersComponent],
  imports: [SharedModule],
})
export class AdminModule {
  constructor() {}
}
