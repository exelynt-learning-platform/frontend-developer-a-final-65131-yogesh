import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { EmployeeService } from '../../core/services/employee.service';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      switchMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) => EmployeeActions.loadEmployeesSuccess({ employees })),
          catchError(() =>
            of(EmployeeActions.loadEmployeesFailure({ error: 'Unable to load employees. Please try again.' }))
          )
        )
      )
    )
  );

  searchEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.searchEmployee),
      switchMap(({ id }) =>
        this.employeeService.getEmployeeById(id).pipe(
          map((employee) => EmployeeActions.searchEmployeeSuccess({ employee })),
          catchError((err) => {
            const error = err.status === 404 ? 'Employee not found.' : 'Unable to search employee. Please try again.';
            return of(EmployeeActions.searchEmployeeFailure({ error }));
          })
        )
      )
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      mergeMap(({ data }) =>
        this.employeeService.createEmployee(data).pipe(
          map((employee) => EmployeeActions.createEmployeeSuccess({ employee })),
          catchError(() =>
            of(EmployeeActions.createEmployeeFailure({ error: 'Unable to create employee. Please try again.' }))
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap(({ id, data }) =>
        this.employeeService.updateEmployee(id, data).pipe(
          map((employee) => EmployeeActions.updateEmployeeSuccess({ employee })),
          catchError(() =>
            of(EmployeeActions.updateEmployeeFailure({ error: 'Unable to update employee. Please try again.' }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap(({ id }) =>
        this.employeeService.deleteEmployee(id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id })),
          catchError(() =>
            of(EmployeeActions.deleteEmployeeFailure({ error: 'Unable to delete employee. Please try again.' }))
          )
        )
      )
    )
  );
}
