import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeFormData } from '../../models/employee.model';

const API_URL = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/${id}`);
  }

  createEmployee(data: EmployeeFormData): Observable<Employee> {
    return this.http.post<Employee>(API_URL, data);
  }

  updateEmployee(id: string, data: EmployeeFormData): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/${id}`, data);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
