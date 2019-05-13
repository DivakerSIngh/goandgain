import { Component, OnInit } from '@angular/core';
import {LoginHeaderService} from '../../../services/login-header.service'

@Component({
  selector: 'app-teacher-profile-leftbar',
  templateUrl: './teacher-profile-leftbar.component.html',
  styleUrls: ['./teacher-profile-leftbar.component.css']
})
export class TeacherProfileLeftbarComponent implements OnInit {

  userFullName :string='';
  userProfilePic :string='';
  email:string='';
  constructor(private loginHeaderService:LoginHeaderService) { }

  ngOnInit() {
    this.loginHeaderService.bs.subscribe((val: any) => {
      if (val.firstName != undefined || val.lastName != undefined || val.profilePic != undefined) {
      //  this.isLoggedIn = true;
      
        if (val.firstName)
          this.userFullName = val.firstName + ' ' + val.lastName;
          this.userProfilePic = val.profilePic;
          this.email=val.email;
      }
      else {
      //  this.isLoggedIn = false;
      }
    });
  }

}
