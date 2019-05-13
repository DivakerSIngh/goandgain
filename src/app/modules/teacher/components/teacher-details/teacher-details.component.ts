import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ElementRef, Renderer, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../..../../../../../modules/shared/loader'
//import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
//import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service';
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';


@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {




  isInstant: boolean = false;

  constructor(private route: ActivatedRoute,
    private teacherService: TeacherService,
    private loader: LoaderService,
    private teacherSubscriberService: TeacherSubscriberService,
    private router: Router
  ) { }

  teacherDetails: any = [];
  courseDetails: any = [];
  ngOnInit() {
    this.loader.display(true);
    var teacherId = this.route.snapshot.paramMap.get("id");
    this.getTecherDetails(teacherId)
  }


  getTecherDetails(teacherId) {
    this.teacherService.getTeacherInformationOuter(teacherId).subscribe((data) => {
      
      if (data.code == '200') {

        this.teacherDetails = data.data;
        this.courseDetails = data.courses;


        //start checking if teacher is available for instatnt tuturing
        if (data.data.classCharges != undefined) {
          var isInstant = data.data.classCharges.filter(x => x.Ctype == "instant");
          if (isInstant.length > 0) {
            this.isInstant = true;
          }
          
          var classes = {
            classCharges: data.data.classCharges,
            availability:data.data.availableTime
          }
          this.teacherSubscriberService.setValue(classes);
        
      }
      //end checking if teacher is available for instatnt tuturing





      if (data.data.videoUrlLink != undefined) {
        
        var object = {
          video: data.data.videoUrlLink
        }
        this.teacherSubscriberService.setValue(object);
      }
    } else {
        this.loader.display(false);
        //this.router.navigate(['']);
      }
      this.loader.display(false);

  }, error => {
  
  this.loader.display(false);
});
  };
}
