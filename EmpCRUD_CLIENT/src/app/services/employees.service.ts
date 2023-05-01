import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmpType } from '../models/empType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmpType[]> {
    return this.http.get<EmpType[]>(this.baseApiUrl + '/api/employee');
  }
  addEmployee(addEmployeeRequest: EmpType): Observable<EmpType> {
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<EmpType>(
      this.baseApiUrl + '/api/employee',
      addEmployeeRequest
    );
  }

  getEmployee(id: string): Observable<EmpType> {
    return this.http.get<EmpType>(this.baseApiUrl + '/api/employee/' + id);
  }

  editEmployee(editEmployeeRequest: EmpType): Observable<EmpType> {
    return this.http.put<EmpType>(
      this.baseApiUrl + '/api/employee',
      editEmployeeRequest
    );
  }

  deleteEmployee(id: string): Observable<EmpType> {
    return this.http.delete<EmpType>(this.baseApiUrl + '/api/employee/' + id);
  }
}
