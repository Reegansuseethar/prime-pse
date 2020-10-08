import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from "ngx-spinner";

import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig } from 'angularx-social-login';


import { AppComponent } from './app.component';

import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1240001746362498')
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1056828131985-019jvlkolqp9p8j4478anr8c4rjijgoh.apps.googleusercontent.com')
}
]);

export function provideConfig() {
  return config;
}


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MatCardModule, MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, NgxSpinnerModule,
    SocialLoginModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
