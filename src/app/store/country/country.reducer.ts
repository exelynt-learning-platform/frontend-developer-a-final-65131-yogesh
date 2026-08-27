import { createReducer, on } from '@ngrx/store';
import { Country } from '../../models/country.model';
import * as CountryActions from './country.actions';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const countryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountries, (state) => ({ ...state, loading: true, error: null })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    countries,
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
