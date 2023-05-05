import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './home/shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShellComponent,
    HeaderComponent
  ],
  imports: [
    // BrowserModule,
    // NgbModule,
    AppRoutingModule,
    // HttpClientModule,
    // FormsModule,
    // SharedModule,
    FontAwesomeModule,
    // ReactiveFormsModule,
    // FileUploadModule,
    // BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
