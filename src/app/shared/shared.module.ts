import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug, faCheck, faExclamationTriangle, faSave } from '@fortawesome/free-solid-svg-icons';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbProgressbarModule,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModule,
    NgbModalModule,
    NgbToastModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbProgressbarModule,
  ],
})
export class SharedModule {
  constructor(public faLib: FaIconLibrary) {
    faLib.addIcons(faSave, faExclamationTriangle, faBug, faCheck);
  }

  // static forRoot(): ModuleWithProviders<SharedModule> {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [WINDOW_PROVIDERS, HostNameService, ValveLabelService]
  //   };
  // }
}
