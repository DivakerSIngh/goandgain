import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-status-calendar',
  templateUrl: './student-status-calendar.component.html',
  styleUrls: ['./student-status-calendar.component.css']
})
export class StudentStatusCalendarComponent implements OnInit {
  model: NgbDateStruct;
  showWeekdays:boolean=true;

  constructor() { }
  ngOnInit() {
  }
  isWeekend(date: NgbDateStruct){
   var d = new Date(date.year,date.month,date.day)
   return d.getDay() === 6;
  }
}
