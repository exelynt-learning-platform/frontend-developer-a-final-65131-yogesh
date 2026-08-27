import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';

const selectCountryState = createFeatureSelector<CountryState>('countries');

export const selectAllCountries = createSelector(selectCountryState, (s) => s.countries);
export const selectCountriesLoading = createSelector(selectCountryState, (s) => s.loading);
export const selectCountriesError = createSelector(selectCountryState, (s) => s.error);
