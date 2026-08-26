import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState, adapter } from './employee.reducer';

const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

const { selectAll } = adapter.getSelectors();

export const selectAllEmployees = createSelector(selectEmployeeState, selectAll);
export const selectEmployeesLoading = createSelector(selectEmployeeState, (s) => s.loading);
export const selectEmployeesError = createSelector(selectEmployeeState, (s) => s.error);
export const selectSearchResult = createSelector(selectEmployeeState, (s) => s.searchResult);
export const selectSearchLoading = createSelector(selectEmployeeState, (s) => s.searchLoading);
export const selectSearchError = createSelector(selectEmployeeState, (s) => s.searchError);
