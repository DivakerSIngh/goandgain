import { Component, OnInit } from '@angular/core';
import { TeacherSubscriberService } from '../../../../../../services/teacher-subscriber.service';
import { TeacherService } from '../../../../../../services/teacher.service';

import { LoaderService } from '../../../../../../modules/shared/loader';

@Component({
  selector: 'app-class-rates',
  templateUrl: './class-rates.component.html',
  styleUrls: ['./class-rates.component.css']
})
export class ClassRatesComponent implements OnInit {

  isChecked: boolean = false;
  ifNoInstantAdded: boolean = false;
  ifNoRegularPriceAdded: boolean = false;
  InstantMins15: any;
  InstantMins30: any;
  InstantMins60: any;

  trialLessons15: any;
  trialLessons30: any;
  trialLessons60: any;

  regularLessonsForOneLesson: any;
  regularLessonsForFiveLesson: any;
  regularLessonsForTenLesson: any;

  constructor(private teacherSubscriberService: TeacherSubscriberService,
     private teacherService: TeacherService,private loaderService:LoaderService) { }

  ngOnInit() {

    var teacherDetails = localStorage.getItem('teacher-full-details') || null;
    
    if (teacherDetails != null) {
      var rateDetails = JSON.parse(teacherDetails);
      if (rateDetails.classCharges != undefined) {
        for (var i = 0; i < rateDetails.classCharges.length; i++) {
          var obj = {
            isInstant: true
          }


          if (rateDetails.classCharges[i].Ctype == 'instant' && rateDetails.classCharges[i].timeDuration == '15') {
            this.InstantMins15 = rateDetails.classCharges[i].price;
            this.teacherSubscriberService.setValue(obj);
            this.isChecked = true;
            // break;
            continue;
          }

          if (rateDetails.classCharges[i].Ctype == 'instant' && rateDetails.classCharges[i].timeDuration == '30') {
            this.InstantMins30 = rateDetails.classCharges[i].price;
            this.teacherSubscriberService.setValue(obj);
            this.isChecked = true;
            //break;
            continue;
          }


          if (rateDetails.classCharges[i].Ctype == 'instant' && rateDetails.classCharges[i].timeDuration == '60') {
            this.InstantMins60 = rateDetails.classCharges[i].price;
            this.teacherSubscriberService.setValue(obj);
            this.isChecked = true;
            //break;
            continue;
          }


          if (rateDetails.classCharges[i].Ctype == 'trial' && rateDetails.classCharges[i].timeDuration == '15') {
            this.trialLessons15 = rateDetails.classCharges[i].price;
            //break;
            continue;
          }

          if (rateDetails.classCharges[i].Ctype == 'trial' && rateDetails.classCharges[i].timeDuration == '30') {
            this.trialLessons30 = rateDetails.classCharges[i].price;
            //break;
            continue;
          }

          if (rateDetails.classCharges[i].Ctype == 'trial' && rateDetails.classCharges[i].timeDuration == '60') {
            this.trialLessons60 = rateDetails.classCharges[i].price;
            //break;
            continue;
          }


          if (rateDetails.classCharges[i].Ctype == 'regular' && rateDetails.classCharges[i].noOfClasses == '1') {
            this.regularLessonsForOneLesson = rateDetails.classCharges[i].price;
            //break;
            continue;
          }


          if (rateDetails.classCharges[i].Ctype == 'regular' && rateDetails.classCharges[i].noOfClasses == '5') {
            this.regularLessonsForFiveLesson = rateDetails.classCharges[i].price;
            //break;
            continue;
          }



          if (rateDetails.classCharges[i].Ctype == 'regular' && rateDetails.classCharges[i].noOfClasses == '10') {
            this.regularLessonsForTenLesson = rateDetails.classCharges[i].price;
            //break;
            continue;
          }


        }
      }
    }

    this.teacherSubscriberService.bs.subscribe((val: any) => {
      

      if (val.isInstantTutoring != undefined) {
        this.isChecked = val.isInstantTutoring;
      }
    });
  }

  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  saveRates() {
    
    if ((this.isChecked && this.isInstantPriceEntered()) || (!this.isChecked)) {
      this.ifNoInstantAdded = false;

      if ((this.regularLessonsForOneLesson != 0 && this.regularLessonsForOneLesson != undefined && this.regularLessonsForOneLesson != '') ||
          (this.regularLessonsForFiveLesson != 0 && this.regularLessonsForFiveLesson != undefined && this.regularLessonsForFiveLesson != '') ||
          (this.regularLessonsForTenLesson != 0 && this.regularLessonsForTenLesson != undefined && this.regularLessonsForTenLesson != '')) {
        this.ifNoRegularPriceAdded = false;
      
        var data = [];
        this.loaderService.display(true);
        if (this.isChecked) {
          
          if (this.InstantMins15 != 0 && this.InstantMins15 != '' && this.InstantMins15!=undefined) {
            var InstantMins15 = {
              "Ctype": 'instant',
              "noOfClasses": 1,
              "timeDuration": 15,
              "price": this.InstantMins15
            }
            data.push(InstantMins15);
          }


          if (this.InstantMins30 != 0 && this.InstantMins30 != '' && this.InstantMins30 != undefined) {
            var InstantMins30 = {
              "Ctype": 'instant',
              "noOfClasses": 1,
              "timeDuration": 30,
              "price": this.InstantMins30
            }
            data.push(InstantMins30);

          }

          if (this.InstantMins60 != 0 && this.InstantMins60 != '' && this.InstantMins60 != undefined) {
            var InstantMins60 = {
              "Ctype": 'instant',
              "noOfClasses": 1,
              "timeDuration": 60,
              "price": this.InstantMins60
            }
            data.push(InstantMins60);
          }
        }

        if (this.trialLessons15 != 0 && this.trialLessons15 != '' && this.trialLessons15 != undefined) {
          var trialLessons15 = {
            "Ctype": 'trial',
            "noOfClasses": 1,
            "timeDuration": 15,
            "price": this.trialLessons15
          }
          data.push(trialLessons15);
        }

        if (this.trialLessons30 != 0 && this.trialLessons30 != '' && this.trialLessons30 != undefined  ) {
          var trialLessons30 = {
            "Ctype": 'trial',
            "noOfClasses": 1,
            "timeDuration": 30,
            "price": this.trialLessons30
          }
          data.push(trialLessons30);
        }



        if (this.trialLessons60 != 0 && this.trialLessons60 != '' && this.trialLessons60 != undefined ) {
          var trialLessons60 = {
            "Ctype": 'trial',
            "noOfClasses": 1,
            "timeDuration": 60,
            "price": this.trialLessons60
          }
          data.push(trialLessons60);
        }



        if (this.regularLessonsForOneLesson != 0 && this.regularLessonsForOneLesson != '' && this.regularLessonsForOneLesson != undefined) {
          var regularLessonsForOneLesson = {
            "Ctype": 'regular',
            "noOfClasses": 1,
            "timeDuration": 60,
            "price": this.regularLessonsForOneLesson
          }
          data.push(regularLessonsForOneLesson);
        }


        if (this.regularLessonsForFiveLesson != 0 && this.regularLessonsForFiveLesson != '' && this.regularLessonsForFiveLesson != undefined) {
          var regularLessonsForFiveLesson = {
            "Ctype": 'regular',
            "noOfClasses": 5,
            "timeDuration": 60,
            "price": this.regularLessonsForFiveLesson
          }
          data.push(regularLessonsForFiveLesson);
        }

        if (this.regularLessonsForTenLesson != 0 && this.regularLessonsForTenLesson != '') {
          var regularLessonsForTenLesson = {
            "Ctype": 'regular',
            "noOfClasses": 10,
            "timeDuration": 60,
            "price": this.regularLessonsForTenLesson
          }
          data.push(regularLessonsForTenLesson);
        }



        this.teacherService.saveClassRate(data).subscribe((data) => {
          if(data.code=='200'){
            localStorage.removeItem('teacher-full-details');
            localStorage.setItem('teacher-full-details', JSON.stringify(data.data));
            this.loaderService.display(false);
          }
        }, error => {
          
          this.loaderService.display(false);
          // this.router.navigate(['']);
        });



      }
      else {
        this.ifNoRegularPriceAdded = true;
      }

    }
    else {
      window.scrollTo(0, 0);
      this.ifNoInstantAdded = true;
    }
  }

  isInstantPriceEntered(): boolean {
    if (
      (this.InstantMins15 != 0 && this.InstantMins15 != undefined && this.InstantMins15 != '') ||
      (this.InstantMins30 != 0 && this.InstantMins30 != undefined && this.InstantMins30 != '') ||
      (this.InstantMins60 != 0 && this.InstantMins60 != undefined && this.InstantMins60 != '')) {
      return true;
    }
    return false;
  }
}
