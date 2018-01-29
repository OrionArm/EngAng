import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppMaterialModule} from './material-module/app-material.module';
import {AppComponent} from './app.component';
import {Routing} from './app.routing';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/guards.guard';
import {AuthenticationService} from './auth/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent} from './auth/registration/registration.component';
import {Config} from './_models/config';
import {HttpService} from './services/http.service';
import {WordSaverComponent} from './page/wordSaver/wordSaver';
import {DictionaryService} from './services/dictionary.service';
import {TestComponent} from './page/test/test';
import { DictionaryComponent } from './page/dictionary/dictionary.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    WordSaverComponent,
    TestComponent,
    DictionaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Routing,
    AppMaterialModule,
    FormsModule
  ],
  providers: [
    Config,
    UserService,
    AuthGuard,
    AuthenticationService,
    HttpService,
    DictionaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
