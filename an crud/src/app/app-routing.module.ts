import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { FrontComponent } from './layouts/front/front.component';

import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ZoomComponentViewComponent } from './manage-university/zoom-component-view/zoom-component-view.component';

import { BlankComponent } from './layouts/blank/blank.component';

import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { AppSideRegisterComponent } from './pages/authentication/register/register.component';

import { NotfoundComponent } from './pages/notfound/notfound.component';

import { AuthgardService } from './services/authgard.service';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('./manage-club/club.module').then((m) => m.ClubModule),
      },

      {
        path: 'transport',
        loadChildren: () =>
          import('./manage-TransportB/Transport.module').then(
            (m) => m.TransportModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: '222',
        loadChildren: () =>
          import('./manage-university/university.module').then(
            (m) => m.UniversityModule
          ),
      },
    ],
  },

  //front-----------------------
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: LandingpageComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },

      {
        path: 'transport',
        loadChildren: () =>
          import('./manage-TransportB/Transport.module').then(
            (m) => m.TransportModule
          ),
      },

      {
        path: 'events',
        loadChildren: () =>
          import('./manage-club/club.module').then((m) => m.ClubModule),
      },

      {
        path: 'client',
        loadChildren: () =>
          import('./manage-university/university.module').then(
            (m) => m.UniversityModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot([
      { path: 'meeting', component: ZoomComponentViewComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
