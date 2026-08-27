import { createAction, props } from '@ngrx/store';
import { Employee, EmployeeFormData } from '../../models/employee.model';

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction('[Employee] Load Employees Success', props<{ employees: Employee[] }>());
export const loadEmployeesFailure = createAction('[Employee] Load Employees Failure', props<{ error: string }>());

export const searchEmployee = createAction('[Employee] Search Employee', props<{ id: string }>());
export const searchEmployeeSuccess = createAction('[Employee] Search Employee Success', props<{ employee: Employee }>());
export const searchEmployeeFailure = createAction('[Employee] Search Employee Failure', props<{ error: string }>());
export const clearSearch = createAction('[Employee] Clear Search');

export const createEmployee = createAction('[Employee] Create Employee', props<{ data: EmployeeFormData }>());
export const createEmployeeSuccess = createAction('[Employee] Create Employee Success', props<{ employee: Employee }>());
export const createEmployeeFailure = createAction('[Employee] Create Employee Failure', props<{ error: string }>());

export const updateEmployee = createAction('[Employee] Update Employee', props<{ id: string; data: EmployeeFormData }>());
export const updateEmployeeSuccess = createAction('[Employee] Update Employee Success', props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction('[Employee] Update Employee Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ id: string }>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());
