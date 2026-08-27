import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { Employee, EmployeeFormData } from '../../../models/employee.model';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    MessageModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() employee: Employee | null = null;
  @Input() countries: Country[] = [];
  @Input() loading = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<EmployeeFormData>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      if (this.form) {
        this.populateForm();
      }
    }
  }

  get isEditMode(): boolean {
    return !!this.employee;
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Edit Employee' : 'Add Employee';
  }

  get submitLabel(): string {
    return this.isEditMode ? 'Update Employee' : 'Add Employee';
  }

  get countryOptions() {
    return this.countries.map((c) => ({ label: c.country, value: c.id }));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      emailId: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s\-]{6,14}$/), Validators.maxLength(15)]],
      countryId: ['', Validators.required],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      district: ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.populateForm();
  }

  private populateForm(): void {
    if (this.employee) {
      this.form.patchValue({
        name: this.employee.name,
        emailId: this.employee.emailId,
        mobile: this.employee.mobile,
        countryId: this.employee.countryId || '',
        state: this.employee.state,
        district: this.employee.district,
      });
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const country = this.countries.find((c) => c.id === this.form.value.countryId);
    const formData: EmployeeFormData = {
      ...this.form.value,
      country: country?.country || '',
    };
    this.save.emit(formData);
  }

  onHide(): void {
    this.form.reset();
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.touched && control?.hasError(error));
  }

  isTouched(field: string): boolean {
    return !!this.form.get(field)?.touched;
  }
}
