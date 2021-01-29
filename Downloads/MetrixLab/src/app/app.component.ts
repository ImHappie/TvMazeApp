import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'metrixlab';
  action: string = 'list';
  employee: any;
  manageEmployee(value:any) {
    const { action, data } = value;
    this.action = action;
    if (data) {
      this.employee = data;
    }
  }
}
