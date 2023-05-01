import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { EmpType } from 'src/app/models/empType';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'Emp-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  //!  static data for testing
  employees: EmpType[] = [];
  sub!: Subscription;
  subDEL!: Subscription;
  constructor(private empService: EmployeesService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.empService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  onDelete(id: string): void {
    this.subDEL = this.empService.deleteEmployee(id).subscribe({
      next: (employee) => {
        console.log(employee);
        this.router.navigate(['/employees']);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subDEL?.unsubscribe();
  }
}
