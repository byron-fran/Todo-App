import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { apiRequestInterceptor } from '../api/ApiRequestInterceptor';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      importProvidersFrom(HttpClientModule),
      provideHttpClient(
        withInterceptors([apiRequestInterceptor]),
   
      ), provideAnimationsAsync()
    ],
    
};
