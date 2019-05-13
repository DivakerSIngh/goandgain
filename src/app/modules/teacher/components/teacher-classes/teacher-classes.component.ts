import { Component, OnInit } from '@angular/core';
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';
import { ISubscription } from "rxjs/Subscription";

import { StudentService } from '../../../../services/student.service';
import { LoginPopupService } from '../../../../services/login-popup.service';


declare var $:any;
@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent implements OnInit {


  subscription: ISubscription;
  instant: any = [];
  trial: any = [];
  regular: any = [];
  selectedType: any;
  ifNoSelectedType: boolean = false;
  allClassType = [];
  trialType: any;
  ifNoTrialType: boolean = false;

  //teacher availability calender
  prepareCalendar:any=[];


  constructor(
    private teacherSubscriberService: TeacherSubscriberService,
    private studentService: StudentService,
    private loginPopupService: LoginPopupService) { }

  ngOnInit() {
    this.subscription = this.teacherSubscriberService.bs.subscribe((val: any) => {

      if (val.classCharges != undefined) {
        
        this.allClassType = val.classCharges;
        let instant = this.allClassType.filter(x => x.Ctype == 'instant')
        if (instant.length > 0) {
          this.instant = this.allClassType.filter(x => x.Ctype == 'instant')
        }

        let trial = this.allClassType.filter(x => x.Ctype == 'trial')
        if (trial.length > 0) {
          this.trial = this.allClassType.filter(x => x.Ctype == 'trial')
        }

        let regular = this.allClassType.filter(x => x.Ctype == 'regular')
        if (regular.length > 0) {
          this.regular = this.allClassType.filter(x => x.Ctype == 'regular')
        }


      }
      if (val.availability != undefined) {
        
        this.prepareCalendar=val.availability;
      }

    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  bookLesson(): void {

    if (this.selectedType != undefined) {
      this.ifNoSelectedType = false;
      if (this.studentService.isLoggedIn()) {

        let data = this.allClassType;
        ///this.allClassType.filter
        //alert(JSON.stringify(data.filter(x => x._id == this.selectedType)));
        $('#availabilityChart').modal('show');
        
        var Wday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var day = new Date();
        var TodayDay = Wday[day.getDay()];   
        
        

      }
      else {
        
        $('#availabilityChart').modal('show');
        // var obj = {
        //   status: true,
        //   url: '../study-group/create-study-group'
        // }
        // this.loginPopupService.setValueForLoginPopUp(obj);
      }
    }
    else {
      this.ifNoSelectedType = true;
      setTimeout(() => {
        this.ifNoSelectedType = false;
       }, 5000);
      //here message please choose an option
    }
  }

  booktrialLesson(): void {
    
    if (this.trialType != undefined) {
      this.ifNoTrialType = false;
      if (this.studentService.isLoggedIn()) {

        let data = this.trial;
        $('#availabilityChart').modal('show');
        ///this.allClassType.filter
      //  alert(JSON.stringify(data.filter(x => x._id == this.trialType)));
      }
      else {
       
       
       
        // var obj = {
        //   status: true,
        //   url: '../study-group/create-study-group'
        // }
        // this.loginPopupService.setValueForLoginPopUp(obj);
      }

    }
    else {
      this.ifNoTrialType = true;
      setTimeout(() => {
        this.ifNoTrialType = false;
       }, 5000);
      //here message please choose an option
    }
  }


  changeValue(index, value) {
    
    this.prepareCalendar[index].availability[value] = !this.prepareCalendar[index].availability[value];
  }

  isCheckedOrNot(index, value) {
    return this.prepareCalendar[index].availability[value];
  }

}
