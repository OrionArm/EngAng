import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './guards/guards.guard';
import {RegistrationComponent} from './auth/registration/registration.component';
import {WordSaverComponent} from './page/wordSaver/wordSaver';
import {TestComponent} from './page/test/test';
import {DictionaryComponent} from './page/dictionary/dictionary.component';



const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'signin/ok', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'saveword', component: WordSaverComponent },
  { path: 'test', component: TestComponent },
  { path: 'dictionary', component: DictionaryComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
