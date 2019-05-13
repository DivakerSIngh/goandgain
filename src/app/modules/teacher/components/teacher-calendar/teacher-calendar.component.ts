import { Component, OnInit } from '@angular/core';
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';

@Component({
  selector: 'app-teacher-calendar',
  templateUrl: './teacher-calendar.component.html',
  styleUrls: ['./teacher-calendar.component.css']
})
export class TeacherCalendarComponent implements OnInit {

  constructor(private teacherSubscriberService: TeacherSubscriberService) { }

  availableTime: any = [];
  ngOnInit() {
    this.teacherSubscriberService.bs.subscribe((val: any) => {
      
      if (val.availableTime != undefined) {
        
        this.availableTime = val.availableTime;
      }
    });
  }
  // ngOnDestroy() {
  //   this.teacherSubscriberService.bs.unsubscribe();
  // }

}
