import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { searchReducer } from './store/search/search.reducer';
import { SearchEffects } from './store/search/search.effects';
import { appReducers } from './store/app.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects(),
    provideRouterStore(),
    provideStore({ search: searchReducer }),
    provideEffects([SearchEffects]),
  ],
};
