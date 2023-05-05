import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './home/shell/shell.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ToastsComponent } from './shared/toasts/toasts.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ShellComponent, HeaderComponent, PageNotFoundComponent, ToastsComponent],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public faLib: FaIconLibrary,){

  }
}
