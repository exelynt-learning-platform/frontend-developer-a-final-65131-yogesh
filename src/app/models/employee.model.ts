export interface Employee {
  id: string;
  name: string;
  emailId: string;
  mobile: string;
  country: string;
  countryId?: string;
  state: string;
  district: string;
  avatar?: string;
  createdAt?: string;
}

export interface EmployeeFormData {
  name: string;
  emailId: string;
  mobile: string;
  countryId: string;
  state: string;
  district: string;
}
