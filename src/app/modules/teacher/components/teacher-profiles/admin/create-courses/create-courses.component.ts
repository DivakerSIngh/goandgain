import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { TeacherService } from '../../../../../../services/teacher.service';
import { StudentService } from '../../../../../../services/student.service';

// import { LoaderService } from '../../../../modules/shared/loader'
// import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {

  languages: any = [];
  language: string = "0";
  level: string = "0";
  type: string = "";
  title: string = "";
  description: string = "";
  noOfLession: string = "";
  priceOfLession: string = "";

  constructor(private studentService: StudentService, private teacherService: TeacherService, private router: Router) { }

  ngOnInit() {
    this.getLanguages();
  }
  getLanguages() {
    this.studentService.getStudentLanguages().subscribe((data) => {
      if (data.code == '200') {
        this.languages = data.data;
      }
    }, error => {
      
      // this.isImage = true;
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  isDisabled(): boolean {
    if (this.language != "0"
      && this.level != "0" && this.type != "" &&
      this.title != "" && this.description != "" && this.noOfLession != ""
      && this.priceOfLession != "") {
      return false;
    }
    else {
      return true;
    }
  }

  public restrictAlpha(e) {
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


  createCourse() {
    
    var obj = {
      tarStuLevel: this.level,
      courseType: this.type.trim(),
      courseTitle: this.title.trim(),
      courseDesciption: this.description.trim(),
      noOfLesson: this.noOfLession,
      price: this.priceOfLession.trim(),
      language: this.language
    }

    this.teacherService.createCourse(obj).subscribe((data) => {
      
      if (data.code == '200') {
        this.router.navigate(['../../teacher/profile/courses']);
      }
      else if (data.code == '401') {

        // setTimeout(() => {
        //   this.createGroupStatus = '';

        // }, 5000);
      }
    }, error => {
      


    });
  }


 
}