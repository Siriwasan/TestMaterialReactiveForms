import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import {
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  // MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
