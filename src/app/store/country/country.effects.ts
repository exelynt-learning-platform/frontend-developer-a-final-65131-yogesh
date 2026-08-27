import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import * as CountryActions from './country.actions';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private countryService = inject(CountryService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      switchMap(() =>
        this.countryService.getCountries().pipe(
          map((countries) => CountryActions.loadCountriesSuccess({ countries })),
          catchError(() =>
            of(CountryActions.loadCountriesFailure({ error: 'Unable to load countries. Please try again.' }))
          )
        )
      )
    )
  );
}
