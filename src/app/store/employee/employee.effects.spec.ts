import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { EmployeeEffects } from './employee.effects';
import { EmployeeService } from '../../core/services/employee.service';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../models/employee.model';

const mockEmployee: Employee = {
  id: '1',
  name: 'John Doe',
  emailId: 'john@example.com',
  mobile: '9876543210',
  country: 'Singapore',
  countryId: '2',
  state: 'Maharashtra',
  district: 'Pune',
};

describe('EmployeeEffects', () => {
  let actions$: Observable<Action>;
  let effects: EmployeeEffects;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EmployeeService', [
      'getEmployees',
      'getEmployeeById',
      'createEmployee',
      'updateEmployee',
      'deleteEmployee',
    ]);

    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        provideMockActions(() => actions$),
        { provide: EmployeeService, useValue: spy },
      ],
    });

    effects = TestBed.inject(EmployeeEffects);
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should dispatch loadEmployeesSuccess on successful load', (done) => {
    employeeService.getEmployees.and.returnValue(of([mockEmployee]));
    actions$ = of(EmployeeActions.loadEmployees());

    effects.loadEmployees$.subscribe((action) => {
      expect(action).toEqual(EmployeeActions.loadEmployeesSuccess({ employees: [mockEmployee] }));
      done();
    });
  });

  it('should dispatch loadEmployeesFailure on error', (done) => {
    employeeService.getEmployees.and.returnValue(throwError(() => new Error('Network error')));
    actions$ = of(EmployeeActions.loadEmployees());

    effects.loadEmployees$.subscribe((action) => {
      expect(action.type).toBe(EmployeeActions.loadEmployeesFailure.type);
      done();
    });
  });

  it('should dispatch createEmployeeSuccess on successful create', (done) => {
    employeeService.createEmployee.and.returnValue(of(mockEmployee));
    actions$ = of(EmployeeActions.createEmployee({ data: { name: 'John', emailId: 'j@e.com', mobile: '123', countryId: '1', state: 'MH', district: 'Pune' } }));

    effects.createEmployee$.subscribe((action) => {
      expect(action).toEqual(EmployeeActions.createEmployeeSuccess({ employee: mockEmployee }));
      done();
    });
  });

  it('should dispatch deleteEmployeeSuccess on successful delete', (done) => {
    employeeService.deleteEmployee.and.returnValue(of(undefined as any));
    actions$ = of(EmployeeActions.deleteEmployee({ id: '1' }));

    effects.deleteEmployee$.subscribe((action) => {
      expect(action).toEqual(EmployeeActions.deleteEmployeeSuccess({ id: '1' }));
      done();
    });
  });

  it('should dispatch searchEmployeeFailure with "not found" on 404', (done) => {
    employeeService.getEmployeeById.and.returnValue(throwError(() => ({ status: 404 })));
    actions$ = of(EmployeeActions.searchEmployee({ id: '999' }));

    effects.searchEmployee$.subscribe((action) => {
      expect(action.type).toBe(EmployeeActions.searchEmployeeFailure.type);
      expect((action as any).error).toContain('not found');
      done();
    });
  });
});
