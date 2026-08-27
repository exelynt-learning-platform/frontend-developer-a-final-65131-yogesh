import { Routes } from '@angular/router';
import { EmployeesPageComponent } from './features/employees/employees-page/employees-page.component';

export const routes: Routes = [
  { path: '', component: EmployeesPageComponent },
  { path: '**', redirectTo: '' },
];
