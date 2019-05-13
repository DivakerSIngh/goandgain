import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../modules/shared/loader';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './student-lesson.component.html',
  styleUrls: ['./student-lesson.component.css']
})
export class StudentLessonComponent implements OnInit {

  constructor(private loaderService:LoaderService) { }

  ngOnInit() {
   this.loaderService.display(false);
  }

}
