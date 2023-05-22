import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faBug,
  faCalendarAlt,
  faCheck,
  faEdit,
  faExclamationTriangle,
  faHandPointer,
  faIdCard,
  faPlus,
  faRotateLeft,
  faSave,
  faSearch,
  faTrashAlt,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  NgbDatepickerModule,
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
import { DatePickerInputComponent } from './date-picker-input/date-picker-input.component';
import { GoBackComponent } from './go-back/go-back.component';
import { InlineLoadingIconComponent } from './inline-loading-icon/inline-loading-icon.component';
import { DialogComponent } from './modals/dialog/dialog.component';
import { ModalHeaderComponent } from './modals/modal-header/modal-header.component';
import { NotFoundMessageComponent } from './not-found-message/not-found-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { SearchComponent } from './search/search.component';
import { ToastsComponent } from './toasts/toasts.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { YesNoSwitcherComponent } from './yes-no-switcher/yes-no-switcher.component';

@NgModule({
  declarations: [
    ToastsComponent,
    PageNotFoundComponent,
    CardButtonComponent,
    GoBackComponent,
    NotFoundMessageComponent,
    UnderConstructionComponent,
    PaginationComponent,
    SearchComponent,
    DatePickerInputComponent,
    DialogComponent,
    ModalHeaderComponent,
    SaveButtonComponent,
    InlineLoadingIconComponent,
    YesNoSwitcherComponent,
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
    NgbDatepickerModule,
  ],
  exports: [
    ToastsComponent,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    CardButtonComponent,
    GoBackComponent,
    UnderConstructionComponent,
    NotFoundMessageComponent,
    PaginationComponent,
    ModalHeaderComponent,
    SaveButtonComponent,
    SearchComponent,
    DatePickerInputComponent,
    YesNoSwitcherComponent
  ],
  entryComponents: [DialogComponent],
})
export class SharedModule {
  constructor(public faLib: FaIconLibrary) {
    faLib.addIcons(
      faSave,
      faExclamationTriangle,
      faBug,
      faCheck,
      faIdCard,
      faArrowLeft,
      faPlus,
      faTrashAlt,
      faEdit,
      faSearch,
      faXmark,
      faCalendarAlt,
      faHandPointer,
      faRotateLeft
    );
  }

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [WINDOW_PROVIDERS, HostNameService],
    };
  }
}
