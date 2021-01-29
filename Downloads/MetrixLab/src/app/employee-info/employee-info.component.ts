import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee: any;
  @Input() employees: any;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() manageEmployee: EventEmitter<any> = new EventEmitter<any>();

  edit: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  updateEmployee() {
    this.edit = true
  }

}
