import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';

import { TeacherService } from '../../../../../services/teacher.service'
import { StudentService } from '../../../../../services/student.service';

import { LoaderService } from '../../../../../modules/shared/loader'
import { LoginHeaderService } from '../../../../../services/login-header.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";



@Component({
  selector: 'app-edit-teacher-profile',
  templateUrl: './edit-teacher-profile.component.html',
  styleUrls: ['./edit-teacher-profile.component.css']
})
export class EditTeacherProfileComponent implements OnInit {


  ngOnInit() {
    
  }


}
