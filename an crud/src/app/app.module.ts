import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { FrontComponent } from './layouts/front/front.component';
import { LoginComponent } from './login/login.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { UniversityModule } from './manage-university/university.module';
import { ClubModule } from './manage-club/club.module';
import { TransportModule } from './manage-TransportB/Transport.module';
import { PreLoaderComponent } from './layouts/front/pre-loader/pre-loader.component';
import { BackToTopComponent } from './layouts/front/back-to-top/back-to-top.component';
import { NavbarComponent } from './layouts/front/navbar/navbar.component';
import { FooterComponent } from './layouts/front/footer/footer.component';

import { NgxWebrtcModule } from 'ngx-webrtc';
import { AngularFireModule } from '@angular/fire/compat';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorPageComponent,
    LogoutComponent,
    SignupComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    PreLoaderComponent,
    BackToTopComponent,
    NavbarComponent,
    FooterComponent,
    FrontComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    AngularFireModule.initializeApp(environment.firebase),
    UniversityModule,
    ClubModule,
    TransportModule,
    NgxWebrtcModule,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
