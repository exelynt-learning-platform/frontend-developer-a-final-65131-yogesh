import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeFormComponent } from './employee-form.component';
import { Employee } from '../../../models/employee.model';
import { Country } from '../../../models/country.model';

const mockCountries: Country[] = [
  { id: '1', country: 'Aruba' },
  { id: '2', country: 'Singapore' },
];

describe('EmployeeFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();
  });

  function createComponent(employee: Employee | null = null) {
    const fixture = TestBed.createComponent(EmployeeFormComponent);
    const component = fixture.componentInstance;
    component.visible = true;
    component.employee = employee;
    component.countries = mockCountries;
    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    const { component } = createComponent();
    expect(component.form.invalid).toBeTrue();
  });

  it('should validate required name field', () => {
    const { component } = createComponent();
    const name = component.form.get('name');
    name?.setValue('');
    name?.markAsTouched();
    expect(component.hasError('name', 'required')).toBeTrue();
  });

  it('should validate email format', () => {
    const { component } = createComponent();
    const email = component.form.get('emailId');
    email?.setValue('not-an-email');
    email?.markAsTouched();
    expect(component.hasError('emailId', 'email')).toBeTrue();
  });

  it('should validate name max length', () => {
    const { component } = createComponent();
    const name = component.form.get('name');
    name?.setValue('a'.repeat(101));
    name?.markAsTouched();
    expect(component.hasError('name', 'maxlength')).toBeTrue();
  });

  it('should be valid with correct values', () => {
    const { component } = createComponent();
    component.form.setValue({
      name: 'John Doe',
      emailId: 'john@example.com',
      mobile: '9876543210',
      countryId: '1',
      state: 'Maharashtra',
      district: 'Pune',
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should emit save with form data when valid', () => {
    const { component } = createComponent();
    const saveSpy = jasmine.createSpy('save');
    component.save.subscribe(saveSpy);

    component.form.setValue({
      name: 'John Doe',
      emailId: 'john@example.com',
      mobile: '9876543210',
      countryId: '1',
      state: 'Maharashtra',
      district: 'Pune',
    });

    component.onSubmit();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should not emit save when form is invalid', () => {
    const { component } = createComponent();
    const saveSpy = jasmine.createSpy('save');
    component.save.subscribe(saveSpy);

    component.onSubmit();
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should show "Edit Employee" title in edit mode', () => {
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
    const { component } = createComponent(mockEmployee);
    expect(component.dialogTitle).toBe('Edit Employee');
    expect(component.submitLabel).toBe('Update Employee');
  });

  it('should pre-populate form when editing', () => {
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
    const { component } = createComponent(mockEmployee);
    expect(component.form.get('name')?.value).toBe('John Doe');
    expect(component.form.get('emailId')?.value).toBe('john@example.com');
  });
});
