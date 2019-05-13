import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../../../services/teacher.service';
import { LoaderService } from '../../../../../../modules/shared/loader'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  allCourses: any = [];
  limit:any=0;
  constructor(private teacherService: TeacherService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.getMycourses(this.limit);
  }

  getMycourses(limit) {
    this.teacherService.getAllCourses(limit).subscribe((data) => {
      
      if (data.code == '200') {
        this.allCourses = data.data;
      } else {
        //no record found
      }
      this.loaderService.display(false);
    }, error => {
      this.loaderService.display(false);
      //this.router.navigate(['']);
    });
  }

}
