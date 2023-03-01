import { NgModule , LOCALE_ID} from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Material
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatSelectModule } from '@angular/material/select';
// import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,
    NotesPageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // MatRadioModule,
    MatIconModule
  ],
  providers: [
    DatePipe,
    { 
      provide: LOCALE_ID, 
      useValue: 'ru' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
