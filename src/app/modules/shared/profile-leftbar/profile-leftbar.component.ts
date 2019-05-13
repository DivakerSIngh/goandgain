import { Component, OnInit,OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {LoginHeaderService} from '../../../../app/services/login-header.service'

@Component({
  selector: 'app-profile-leftbar',
  templateUrl: './profile-leftbar.component.html',
  styleUrls: ['./profile-leftbar.component.css']
})
export class ProfileLeftbarComponent implements OnInit, OnDestroy {

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
  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
    // this.httpSubscription.unsubscribe();
  }

}
