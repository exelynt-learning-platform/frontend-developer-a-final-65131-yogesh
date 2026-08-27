import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

import { Employee, EmployeeFormData } from '../../../models/employee.model';
import { Country } from '../../../models/country.model';

import * as EmployeeActions from '../../../store/employee/employee.actions';
import * as CountryActions from '../../../store/country/country.actions';
import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
  selectSearchResult,
  selectSearchLoading,
  selectSearchError,
} from '../../../store/employee/employee.selectors';
import { selectAllCountries } from '../../../store/country/country.selectors';

import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    EmployeeListComponent,
    EmployeeFormComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css',
  providers: [MessageService, ConfirmationService],
})
export class EmployeesPageComponent implements OnInit {
  private store = inject(Store);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private actions$ = inject(Actions);

  employees$ = this.store.select(selectAllEmployees);
  loading$ = this.store.select(selectEmployeesLoading);
  error$ = this.store.select(selectEmployeesError);
  searchResult$ = this.store.select(selectSearchResult);
  searchLoading$ = this.store.select(selectSearchLoading);
  searchError$ = this.store.select(selectSearchError);
  countries$ = this.store.select(selectAllCountries);

  searchId = '';
  formVisible = false;
  selectedEmployee: Employee | null = null;
  formLoading = false;

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
    this.store.dispatch(CountryActions.loadCountries());
  }

  onSearch(): void {
    const id = this.searchId.trim();
    if (!id) return;
    this.store.dispatch(EmployeeActions.searchEmployee({ id }));
  }

  onClearSearch(): void {
    this.searchId = '';
    this.store.dispatch(EmployeeActions.clearSearch());
  }

  onAddEmployee(): void {
    this.selectedEmployee = null;
    this.formVisible = true;
  }

  onEditEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
    this.formVisible = true;
  }

  onDeleteEmployee(employee: Employee): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${employee.name}</strong>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.store.dispatch(EmployeeActions.deleteEmployee({ id: employee.id }));

        this.actions$
          .pipe(ofType(EmployeeActions.deleteEmployeeSuccess, EmployeeActions.deleteEmployeeFailure), take(1))
          .subscribe((action) => {
            if (action.type === EmployeeActions.deleteEmployeeSuccess.type) {
              this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Employee deleted successfully.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to delete employee. Please try again.' });
            }
          });
      },
    });
  }

  onFormSave(data: EmployeeFormData): void {
    this.formLoading = true;

    if (this.selectedEmployee) {
      this.store.dispatch(EmployeeActions.updateEmployee({ id: this.selectedEmployee.id, data }));

      this.actions$
        .pipe(ofType(EmployeeActions.updateEmployeeSuccess, EmployeeActions.updateEmployeeFailure), take(1))
        .subscribe((action) => {
          this.formLoading = false;
          if (action.type === EmployeeActions.updateEmployeeSuccess.type) {
            this.formVisible = false;
            this.selectedEmployee = null;
            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Employee updated successfully.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to update employee. Please try again.' });
          }
        });
    } else {
      this.store.dispatch(EmployeeActions.createEmployee({ data }));

      this.actions$
        .pipe(ofType(EmployeeActions.createEmployeeSuccess, EmployeeActions.createEmployeeFailure), take(1))
        .subscribe((action) => {
          this.formLoading = false;
          if (action.type === EmployeeActions.createEmployeeSuccess.type) {
            this.formVisible = false;
            this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Employee added successfully.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to create employee. Please try again.' });
          }
        });
    }
  }

  onFormCancel(): void {
    this.formLoading = false;
    this.selectedEmployee = null;
  }
}
