import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'
import { HeaderService } from '../../../../header.service';


import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [TeacherService]
})
export class ApplicationComponent implements OnInit {


  createdTime: string;
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private headerService: HeaderService
  ) { }


  ngOnInit() {

    this.headerService.setHeaderValue(true);
    this.getTeacherInformation();
  }




  //fetching teacher information method
  getTeacherInformation() {
    this.loaderService.display(true);
    
    this.teacherService.getTeacherInformation().subscribe((data) => {
      
      if (data.code == '200') {
        if (data.tutorsInfo.length > 0) {

          if (data.tutorsInfo[0].created != undefined) {
            this.createdTime = data.tutorsInfo[0].created;
          }



        }
        this.loaderService.display(false);

      }
      else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  };

  gotoHomePage() {
    this.router.navigate(['']);
    localStorage.clear();
  }
}
