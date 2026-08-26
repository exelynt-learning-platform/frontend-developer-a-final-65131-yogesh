import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Employee } from '../../../models/employee.model';
import { Country } from '../../../models/country.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Input() countries: Country[] = [];
  @Input() loading = false;

  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  getCountryName(employee: Employee): string {
    if (employee.countryId) {
      const country = this.countries.find((c) => c.id === employee.countryId);
      if (country) return country.country;
    }
    return employee.country || '—';
  }
}
