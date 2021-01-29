import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../types/User';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnChanges {
  page: number = 1
  employees: any;
  employee: any;
  @Input() action: string = 'list';
  @Input() employeeInfo: any;
  @Output() manageEmployee: EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: DataService) { 
    this.service.getEmployees(this.page).subscribe((res) => {
      this.employees = res.data;
    })
  }

  getEmployee(data:User) {
    this.employee = data;
    this.manageEmployee.emit({action:'info'});
  }

  removeEmployee(id:number) {
    const filterEmployee = this.employees.filter((emp:User) => emp.id !== id);
    this.employees = filterEmployee;
    this.manageEmployee.emit({action:'list',data:this.employees});
  }

  ngOnInit(): void {
    
  }
  ngOnChanges(): void {
    if(this.employees && this.employeeInfo){
      this.employees = this.employeeInfo;
    }
  }

}
