import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import {AuthInterceptor} from "./auth.interceptor";

export const authInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    authInterceptorProvider,
    provideRouter(routes)
  ]
};
