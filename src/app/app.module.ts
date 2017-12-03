import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppMaterialModule} from './material-module/app-material.module';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {UserService} from './services/user.service';
import {AuthGuard} from './guards/guards.guard';
import {AuthenticationService} from './services/authentication.service';
import {ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {Config} from './_models/config';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Routing,
    AppMaterialModule
  ],
  providers: [
    Config,
    UserService,
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
