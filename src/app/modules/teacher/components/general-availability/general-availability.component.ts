import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'
import { CalenderService } from '../../../../services/calender.service'

import { HeaderService } from '../../../../header.service';


import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-general-availability',
  templateUrl: './general-availability.component.html',
  styleUrls: ['./general-availability.component.css'],
  providers: [TeacherService, CalenderService]
})
export class GeneralAvailabilityComponent implements OnInit {


  prepareCalendar: any;
  timeZone: string;
  noAvailability:boolean=false;
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private calenderService: CalenderService,
    private headerService :HeaderService) { }

  ngOnInit() {
    this.headerService.setHeaderValue(true);

    this.getCalendarForm();
    this.getTeacherInformation();
  }

  getCalendarForm() {
    this.prepareCalendar = this.calenderService.getCalendarForm();
    
  }

  goToBack() {
    this.router.navigate(['../../teacher/introduction']);
  }

  changeValue(index, value) {
    this.prepareCalendar[index].availability[value] = !this.prepareCalendar[index].availability[value];
  }

  isCheckedOrNot(index, value) {
    return this.prepareCalendar[index].availability[value];
  }

  goToNext() {
    this.loaderService.display(true);
    this.teacherService.saveTeacherAvailableTime(this.prepareCalendar).subscribe((data) => {
      
      if (data.code == '200') {
        this.loaderService.display(false);
        this.router.navigate(['../../teacher/application']);
      }
      else {

        //this.router.navigate(['']);
      }


    }, error => {
      //this.router.navigate(['']);
    });

  }

  //fetching teacher information method
  getTeacherInformation() {

    
    this.loaderService.display(true);
    
    this.teacherService.getTeacherInformation().subscribe((data) => {
    localStorage.setItem('teacherSubmitTime', data.tutorsInfo[0].updated);
      if (data.code == '200') {
        
        if (data.tutorsInfo.length > 0) {
       
          if (data.tutorsInfo[0].timeZone != undefined) {
            this.timeZone = data.tutorsInfo[0].timeZone;
          }
          if(data.tutorsInfo[0].availableTime!=undefined && data.tutorsInfo[0].availableTime.length>0){
            this.prepareCalendar=[];
            this.prepareCalendar = data.tutorsInfo[0].availableTime;
          }
        }
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.router.navigate(['']);
    });
  };

}
