import { Component, OnInit } from '@angular/core';


import { LoaderService } from '../../../../../../modules/shared/loader'
import { TeacherService } from '../../../../../../services/teacher.service'
import { CalenderService } from '../../../../../../services/calender.service'

import { HeaderService } from '../../../../../../header.service';



import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  providers: [CalenderService]
})
export class AvailabilityComponent implements OnInit {

  prepareCalendar: any = [];
  timeZone: string;
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private calenderService: CalenderService,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.getCalendarForm();
    this.getTeacherInformation()
  }

  getCalendarForm() {
    this.prepareCalendar = this.calenderService.getCalendarForm();
  }

  //fetching teacher information method
  getTeacherInformation() {

    
    this.loaderService.display(true);
    this.teacherService.getTeacherInfoAfterLogin().subscribe((data) => {
      
      if (data.code == '200') {

        if (data.tutorsInfo.length > 0) {

          if (data.tutorsInfo[0].timeZone != undefined) {
            this.timeZone = data.tutorsInfo[0].timeZone;
          }
          if (data.tutorsInfo[0].availableTime != undefined && data.tutorsInfo[0].availableTime.length > 0) {
            this.prepareCalendar = [];
            this.prepareCalendar = data.tutorsInfo[0].availableTime;
          }
        }
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      
      //this.router.navigate(['']);
    });
  };


  changeValue(index, value) {
    this.prepareCalendar[index].availability[value] = !this.prepareCalendar[index].availability[value];
  }

  isCheckedOrNot(index, value) {
    return this.prepareCalendar[index].availability[value];
  }


}



