import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as EmployeeActions from './employee.actions';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string | null;
  searchResult: Employee | null;
  searchLoading: boolean;
  searchError: string | null;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  error: null,
  searchResult: null,
  searchLoading: false,
  searchError: null,
});

export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) =>
    adapter.setAll(employees, { ...state, loading: false })
  ),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(EmployeeActions.searchEmployee, (state) => ({
    ...state,
    searchLoading: true,
    searchError: null,
    searchResult: null,
  })),
  on(EmployeeActions.searchEmployeeSuccess, (state, { employee }) => ({
    ...state,
    searchLoading: false,
    searchResult: employee,
  })),
  on(EmployeeActions.searchEmployeeFailure, (state, { error }) => ({
    ...state,
    searchLoading: false,
    searchError: error,
  })),
  on(EmployeeActions.clearSearch, (state) => ({
    ...state,
    searchResult: null,
    searchError: null,
  })),

  on(EmployeeActions.createEmployee, (state) => ({ ...state, loading: true })),
  on(EmployeeActions.createEmployeeSuccess, (state, { employee }) =>
    adapter.addOne(employee, { ...state, loading: false })
  ),
  on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(EmployeeActions.updateEmployee, (state) => ({ ...state, loading: true })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) =>
    adapter.upsertOne(employee, { ...state, loading: false })
  ),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(EmployeeActions.deleteEmployee, (state) => ({ ...state, loading: true })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
