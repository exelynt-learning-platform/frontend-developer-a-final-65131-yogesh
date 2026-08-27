import { employeeReducer, EmployeeState, adapter } from './employee.reducer';
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

const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  error: null,
  searchResult: null,
  searchLoading: false,
  searchError: null,
});

describe('Employee Reducer', () => {
  it('should return initial state', () => {
    const state = employeeReducer(undefined, { type: '@@INIT' } as any);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set loading on loadEmployees', () => {
    const state = employeeReducer(initialState, EmployeeActions.loadEmployees());
    expect(state.loading).toBeTrue();
  });

  it('should populate employees on loadEmployeesSuccess', () => {
    const state = employeeReducer(initialState, EmployeeActions.loadEmployeesSuccess({ employees: [mockEmployee] }));
    expect(state.loading).toBeFalse();
    expect(state.ids.length).toBe(1);
  });

  it('should set error on loadEmployeesFailure', () => {
    const state = employeeReducer(initialState, EmployeeActions.loadEmployeesFailure({ error: 'Load failed' }));
    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Load failed');
  });

  it('should add employee on createEmployeeSuccess', () => {
    const state = employeeReducer(initialState, EmployeeActions.createEmployeeSuccess({ employee: mockEmployee }));
    expect(state.ids).toContain('1');
  });

  it('should update employee on updateEmployeeSuccess', () => {
    const stateWithEmployee = adapter.addOne(mockEmployee, initialState);
    const updated = { ...mockEmployee, name: 'Updated Name' };
    const state = employeeReducer(stateWithEmployee, EmployeeActions.updateEmployeeSuccess({ employee: updated }));
    expect(state.entities['1']?.name).toBe('Updated Name');
  });

  it('should remove employee on deleteEmployeeSuccess', () => {
    const stateWithEmployee = adapter.addOne(mockEmployee, initialState);
    const state = employeeReducer(stateWithEmployee, EmployeeActions.deleteEmployeeSuccess({ id: '1' }));
    expect(state.ids).not.toContain('1');
  });

  it('should set search result on searchEmployeeSuccess', () => {
    const state = employeeReducer(initialState, EmployeeActions.searchEmployeeSuccess({ employee: mockEmployee }));
    expect(state.searchResult).toEqual(mockEmployee);
    expect(state.searchLoading).toBeFalse();
  });

  it('should clear search result on clearSearch', () => {
    const stateWithSearch = { ...initialState, searchResult: mockEmployee };
    const state = employeeReducer(stateWithSearch, EmployeeActions.clearSearch());
    expect(state.searchResult).toBeNull();
  });
});
