import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { User } from '../../types/User';
@Component({
  selector: 'app-employee-invite',
  templateUrl: './employee-invite.component.html',
  styleUrls: ['./employee-invite.component.scss']
})
export class EmployeeInviteComponent implements OnInit {
  @Input() edit: boolean = false;
  @Input() employee:any;
  @Input() employees:any;
  @Output() manageEmployee: EventEmitter<any> = new EventEmitter<any>();
  avatarImg: any;
  constructor(private fb: FormBuilder) { 
  }
  employeeForm: FormGroup = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['',Validators.required],
    avatarImg: ['',Validators.required],
  })

  ngOnInit(): void {
    if (this.employee) {
      const { first_name, last_name, email, avatar } = this.employee;
      this.employeeForm.setValue({
        firstName: first_name,
        lastName: last_name,
        email: email,
        avatarImg: avatar
      });
    }
    this.edit = this.edit;
  }
  getAvatar($event:any) {
    let file = $event.target.files[0]; 
    const blob = new Blob([file],{type: 'image/png'})
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      this.avatarImg = reader.result;
      this.employee.avatar = reader.result;
      this.employeeForm.controls.avatarImg.setValue(reader.result)
      
    };
  }
  
  getEmployeeInfo() {
    if (!this.edit) {
    const { firstName, lastName, email, avatarImg } = this.employeeForm.value;
    const data = {id: Date.now(),first_name:firstName, last_name: lastName, email, avatar: this.avatarImg};
    this.employees.push(data);
    this.manageEmployee.emit({action:'list',data:this.employees});
    }
    else {
      const employeeInfo = this.employees.filter((emp:User) => emp.id !== this.employee.id);
      const { firstName, lastName, email, avatarImg } = this.employeeForm.value;
      const { id, first_name, last_name, avatar } = this.employee;
      const data = {id: id,first_name:firstName, last_name: lastName, email, avatar: avatarImg};
      employeeInfo.push(data);
      this.manageEmployee.emit({action:'list',data:employeeInfo});
    }

  }

}
