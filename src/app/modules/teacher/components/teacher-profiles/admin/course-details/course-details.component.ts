import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../../../services/teacher.service';

declare var $:any;


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  courseId: any;
  language: any;
  targetStudentLevel: any;
  courseType: any;
  courseTitle: any;
  courseDescription: any;
  noOfLesson: any;
  price: any;



  constructor(private route: ActivatedRoute,
    private loader: LoaderService,
    private router: Router,
    private teacherService: TeacherService) { }

  ngOnInit() {
    this.loader.display(true);
    this.courseId = this.route.snapshot.paramMap.get("id");
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(courseId) {
    this.teacherService.getCourseDetails(courseId).subscribe((data) => {
      if (data.code == '200') {

        this.language = data.data.language;
        this.targetStudentLevel = data.data.targetStudentLevel;
        this.courseType = data.data.courseType;
        this.courseTitle = data.data.courseTitle;
        this.courseDescription = data.data.courseDesciption;
        this.noOfLesson = data.data.noOfLesson;
        this.price = data.data.price;


        this.loader.display(false);
      } else {
        this.loader.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      
      this.loader.display(false);
      this.router.navigate(['']);
    });
  };

  deleteCourse(){
   
    this.loader.display(true);
    this.teacherService.deleteCourse(this.courseId).subscribe((data) => {
    
      if (data.code == '200') {
         $('#deletecourse').modal('hide');
         this.router.navigate(['../../teacher/profile/courses']);
      } else {
        this.loader.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      
      this.loader.display(false);
      this.router.navigate(['']);
    });
  }


}
