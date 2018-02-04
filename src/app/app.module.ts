import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

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
import {Ng2Webstorage} from 'ngx-webstorage';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import { WordDictionaryComponent } from './page/dictionary/word-dictionary.component';
import {TestService} from './services/test-services';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    WordSaverComponent,
    TestComponent,
    DictionaryComponent,
    WordDictionaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Routing,
    AppMaterialModule,
    FormsModule,
    Ng2Webstorage.forRoot({ prefix: 'dict', separator: '.', caseSensitive: false }),
    // The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
    // Default values:
    // prefix: 'ng2-webstorage'
    // separator: '|'
    // caseSensitive: false
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    Config,
    UserService,
    AuthGuard,
    AuthenticationService,
    HttpService,
    DictionaryService,
    TestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
