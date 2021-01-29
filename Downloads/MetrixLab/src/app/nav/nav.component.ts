import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() manageEmployee: EventEmitter<any> = new EventEmitter<any>();
  @Input() action: string = 'list';
  constructor() { }
  ngOnInit(): void {
  }

  

}
