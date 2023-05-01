import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpType } from 'src/app/models/empType';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'Emp-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnDestroy {
  sub!: Subscription;
  addEmployeeRequest: EmpType = {
    id: '',
    name: '',
    email: '',
    salary: 0,
    deptName: '',
  };

  constructor(
    private router: Router,
    private employeeService: EmployeesService
  ) {}

  addEmployee(): void {
    this.sub = this.employeeService
      .addEmployee(this.addEmployeeRequest)
      .subscribe({
        next: (employee) => {
          console.log(employee);
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    // console.log(this.addEmployeeRequest);
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    // throw new Error('Method not implemented.');
  }
}
