import { Routes } from '@angular/router';
import {BaseComponent} from './component/layout/base/base.component';
import {DashboardComponent} from './component/pages/dashboard/dashboard.component';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login Form' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register Form' }
  },
  {
    path: 'base',
    component: BaseComponent,
    data: { title: 'Base' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
    ]
  },

];
