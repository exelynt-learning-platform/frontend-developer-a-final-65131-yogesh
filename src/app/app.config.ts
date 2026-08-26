import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { employeeReducer } from './store/employee/employee.reducer';
import { countryReducer } from './store/country/country.reducer';
import { EmployeeEffects } from './store/employee/employee.effects';
import { CountryEffects } from './store/country/country.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      employees: employeeReducer,
      countries: countryReducer,
    }),
    provideEffects([EmployeeEffects, CountryEffects]),
  ],
};
