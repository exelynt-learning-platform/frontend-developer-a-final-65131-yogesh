import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { Employee } from '../../models/employee.model';

const API = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

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

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should get all employees', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].name).toBe('John Doe');
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmployee]);
  });

  it('should get employee by id', () => {
    service.getEmployeeById('1').subscribe((employee) => {
      expect(employee.id).toBe('1');
    });

    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should create an employee', () => {
    const formData = {
      name: 'Jane Smith',
      emailId: 'jane@example.com',
      mobile: '9876543211',
      countryId: '2',
      state: 'Maharashtra',
      district: 'Mumbai',
    };

    service.createEmployee(formData).subscribe((employee) => {
      expect(employee.name).toBe('John Doe');
    });

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(mockEmployee);
  });

  it('should update an employee', () => {
    const formData = {
      name: 'John Updated',
      emailId: 'john@example.com',
      mobile: '9876543210',
      countryId: '2',
      state: 'Maharashtra',
      district: 'Pune',
    };

    service.updateEmployee('1', formData).subscribe((employee) => {
      expect(employee.id).toBe('1');
    });

    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEmployee);
  });

  it('should delete an employee', () => {
    service.deleteEmployee('1').subscribe();

    const req = httpMock.expectOne(`${API}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
