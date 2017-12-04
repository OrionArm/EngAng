import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './guards/guards.guard';
import {RegistrationComponent} from './auth/registration/registration.component';



const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'signin/ok', component: HomeComponent },
  { path: '', component: HomeComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
