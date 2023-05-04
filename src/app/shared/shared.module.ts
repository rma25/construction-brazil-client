import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbNavModule, NgbProgressbarModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbProgressbarModule,
  ],
})
export class SharedModule {
  constructor() {}
}
