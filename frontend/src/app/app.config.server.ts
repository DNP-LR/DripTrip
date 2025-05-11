import {ApplicationConfig, mergeApplicationConfig} from '@angular/core';
import {provideServerRendering} from '@angular/platform-server';
import {provideServerRouting} from '@angular/ssr';
import {appConfig} from './app.config';
import {serverRoutes} from './app.routes.server';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideAnimationsAsync(),
    provideServerRouting(serverRoutes)
  ]
};


export const config: ApplicationConfig = mergeApplicationConfig(appConfig, serverConfig);
