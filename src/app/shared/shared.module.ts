import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug, faCheck, faExclamationTriangle, faIdCard, faSave } from '@fortawesome/free-solid-svg-icons';
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

import { WINDOW_PROVIDERS } from '../providers/window.provider';
import { HostNameService } from '../services/hostname.service';
import { CardButtonComponent } from './card-button/card-button.component';
import { GoBackComponent } from './go-back/go-back.component';
import { NotFoundMessageComponent } from './not-found-message/not-found-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastsComponent } from './toasts/toasts.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

@NgModule({
  declarations: [
    ToastsComponent,
    PageNotFoundComponent,
    CardButtonComponent,
    GoBackComponent,
    NotFoundMessageComponent,
    UnderConstructionComponent,
  ],
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
  exports: [
    ToastsComponent,
    CommonModule,
    FontAwesomeModule,
    CardButtonComponent,
    GoBackComponent,
    UnderConstructionComponent
  ],
})
export class SharedModule {
  constructor(public faLib: FaIconLibrary) {
    faLib.addIcons(faSave, faExclamationTriangle, faBug, faCheck, faIdCard);
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [WINDOW_PROVIDERS, HostNameService],
    };
  }
}
