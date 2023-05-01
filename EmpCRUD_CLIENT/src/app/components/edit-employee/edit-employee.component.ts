import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpType } from 'src/app/models/empType';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'Emp-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  subGET!: Subscription;
  subPUT!: Subscription;

  editEmployeeRequest: EmpType = {
    id: '',
    name: '',
    email: '',
    salary: 0,
    deptName: '',
  };
  id: string = this.route.snapshot.paramMap.get('id') || '';

  ngOnInit(): void {
    this.subGET = this.employeesService.getEmployee(this.id).subscribe({
      next: (employee) => {
        console.log(employee);
        this.editEmployeeRequest = employee;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // editEmployeeRequest =
    // throw new Error('Method not implemented.');
  }

  editEmployee() {
    this.subPUT = this.employeesService
      .editEmployee(this.editEmployeeRequest)
      .subscribe({
        next: (employee) => {
          console.log(employee);
          console.log('success');
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.log(err);
        },
      });

  }

  ngOnDestroy(): void {
    this.subGET?.unsubscribe();
    this.subPUT?.unsubscribe();
  }
}
