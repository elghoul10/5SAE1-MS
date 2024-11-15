import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AppSideLoginComponent } from './authentication/login/login.component';
import { AppSideRegisterComponent } from './authentication/register/register.component';

export const PagesRoutes: Routes = [
  {
    path: ':id',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
