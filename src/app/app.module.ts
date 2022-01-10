import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileGalleryComponent} from "./profile-gallery/profile-gallery.component";
import {PetformComponent} from "./petform/petform.component";
import {NameFilterPipe} from "./pipes/name-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ProfileGalleryComponent,
    PetformComponent,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
