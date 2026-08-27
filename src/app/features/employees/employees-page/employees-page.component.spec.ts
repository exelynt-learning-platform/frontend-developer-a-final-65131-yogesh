import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { EmployeesPageComponent } from './employees-page.component';
import * as EmployeeActions from '../../../store/employee/employee.actions';
import * as CountryActions from '../../../store/country/country.actions';
import { Employee } from '../../../models/employee.model';

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

const initialState = {
  employees: {
    ids: ['1'],
    entities: { '1': mockEmployee },
    loading: false,
    error: null,
    searchResult: null,
    searchLoading: false,
    searchError: null,
  },
  countries: {
    countries: [{ id: '2', country: 'Singapore' }],
    loading: false,
    error: null,
  },
};

describe('EmployeesPageComponent', () => {
  let store: MockStore;
  let actions$: Observable<Action>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesPageComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        MessageService,
        ConfirmationService,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    actions$ = of();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(EmployeesPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadEmployees and loadCountries on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    createComponent();
    expect(dispatchSpy).toHaveBeenCalledWith(EmployeeActions.loadEmployees());
    expect(dispatchSpy).toHaveBeenCalledWith(CountryActions.loadCountries());
  });

  it('should open add form when onAddEmployee is called', () => {
    const { component } = createComponent();
    component.onAddEmployee();
    expect(component.formVisible).toBeTrue();
    expect(component.selectedEmployee).toBeNull();
  });

  it('should open edit form with employee when onEditEmployee is called', () => {
    const { component } = createComponent();
    component.onEditEmployee(mockEmployee);
    expect(component.formVisible).toBeTrue();
    expect(component.selectedEmployee).toEqual(mockEmployee);
  });

  it('should dispatch searchEmployee when onSearch is called', () => {
    const { component } = createComponent();
    const dispatchSpy = spyOn(store, 'dispatch');
    component.searchId = '1';
    component.onSearch();
    expect(dispatchSpy).toHaveBeenCalledWith(EmployeeActions.searchEmployee({ id: '1' }));
  });

  it('should not dispatch search when searchId is empty', () => {
    const { component } = createComponent();
    const dispatchSpy = spyOn(store, 'dispatch');
    component.searchId = '';
    component.onSearch();
    expect(dispatchSpy).not.toHaveBeenCalledWith(jasmine.objectContaining({ type: EmployeeActions.searchEmployee.type }));
  });

  it('should dispatch clearSearch when onClearSearch is called', () => {
    const { component } = createComponent();
    const dispatchSpy = spyOn(store, 'dispatch');
    component.searchId = '1';
    component.onClearSearch();
    expect(component.searchId).toBe('');
    expect(dispatchSpy).toHaveBeenCalledWith(EmployeeActions.clearSearch());
  });

  it('should reset form state on cancel', () => {
    const { component } = createComponent();
    component.selectedEmployee = mockEmployee;
    component.formLoading = true;
    component.onFormCancel();
    expect(component.selectedEmployee).toBeNull();
    expect(component.formLoading).toBeFalse();
  });
});
