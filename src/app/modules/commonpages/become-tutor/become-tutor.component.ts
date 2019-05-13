import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service'
import { StudentService } from '../../../services/student.service'
import { LoaderService } from '../../../modules/shared/loader';
import { AuthService } from "angular4-social-login";

import { HeaderFooterService } from '../../../modules/shared/header-footer.service';

import { HeaderService } from '../../../header.service';

import { LoginHeaderService } from '../../shared/../../services/login-header.service'

@Component({
  selector: 'app-become-tutor',
  templateUrl: './become-tutor.component.html',
  styleUrls: ['./become-tutor.component.css']
})
export class BecomeTutorComponent implements OnInit {

  signupPopup: NgbModalRef;
  registrationResponse: string = '';

  dynamicFormControl: any;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  loginType: '3';
  isSocialSignup: boolean = false;
  varificationLink:string='';
  isEmailFalse:boolean=false;
  constructor(private modalService: NgbModal,
    private accountService: AccountService,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private headerFooterService: HeaderFooterService,
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router,
    private loginHeaderService: LoginHeaderService) { }

  ngOnInit() {
  }
  open(content) {
    if (this.signupPopup) {
      this.signupPopup.close();
    }
    this.signupPopup = this.modalService.open(content);
  }


  signUp(content) {
    this.loaderService.display(true);
    this.dynamicFormControl = content;
    var data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      isSocial: this.isSocialSignup,
      loginType: this.loginType
    }
  
    this.accountService.signup(data).subscribe((data) => {
      if (data.code == '200') {
        this.signupPopup.close();
        this.loaderService.display(false);
        if (!this.isSocialSignup) {

          if (data.UserInfo.roleId == '4') {
            //redirect student here
            this.varificationLink = 'http://52.8.169.78:7112/student/profile/' + data.token;
          }
          else if (data.UserInfo.roleId == '3') {
            //teacher

            //this.varificationLink = 'http://52.8.169.78:7112/teacher/generalprofile/' + data.token;
          }
          this.open(this.dynamicFormControl);
        } else {
          if (data.UserInfo.roleId == '4') {
            //redirect student here
            //http://localhost:4200/student/profile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDM0ZTdkMzg5NWQ5MWZmZTNjNDMxMiIsImlhdCI6MTUxNDM2MDQ0NSwiZXhwIjoxNTE2OTUyNDQ1fQ.Ee6Lz7fTmdMv4MJrfZWPnHHYcmiMuKR9MdGhQDMaFK8
            this.signupPopup.close();
            this.router.navigate(['../../student/profile/' + data.token]);
          }
          else if (data.UserInfo.roleId == '3') {
            //teacher
            this.signupPopup.close();
            //http://localhost:4200/teacher/generalprofile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDQ3ZmY0NDU0MTM1MDE3NTU4ZjYyNiIsImlhdCI6MTUxNDQzODY0NCwiZXhwIjoxNTE3MDMwNjQ0fQ.LsEXHK9H5CJwrRz951aY80oLdNN4DUDmK6icN5_2lvQ
            this.router.navigate(['../../teacher/generalprofile/' + data.token]);

          }
        }
      }
      else {
        this.loaderService.display(false);
        this.registrationResponse = data.message;
        setTimeout(() => {
          this.registrationResponse='';
         }, 3000);
      }
    }, error => {
      if (error.code == 501) {
        // this.reg.email = '';
        this.registrationResponse = error.message;
        setTimeout(() => {
          this.registrationResponse='';
         }, 3000);
      }
    }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  connectWithFacebook() {
    // this.loaderService.display(true);
    // setTimeout(() => this.loaderService.display(true), 4000);
     this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((success) => {
       if (success.authToken != null) {
         var obj = {
           email: success.email
         }
 
         if (success.email != undefined && success.email != '') {
           localStorage.setItem('regfb_email', success.email);
         }
 
         localStorage.setItem('regfb_firstName', success.firstName);
         localStorage.setItem('regfb_lastName', success.lastName);
 
         this.accountService.userAlreadyExistsOrNot(obj).subscribe((data) => {
 
           if (data.code == '200') {
            // this.reg = new UserRegistration();
            // this.reg.isStudent = '1';
             this.firstName = localStorage.getItem('regfb_firstName');
             this.lastName = localStorage.getItem('regfb_lastName');
             if (localStorage.getItem('regfb_email') != null && localStorage.getItem('regfb_email') != null) {
               this.email = localStorage.getItem('regfb_email');
               this.isEmailFalse = true;
             }
             this.loaderService.display(false);
             this.isSocialSignup = true;
             
           }
           else {
             if (data.UserInfo[0].roleId == '4') {
                   //4 from student
                   if(data.UserInfo[0].status=='1'){
                     this.signupPopup.close();
                     var object = {
                       firstName: data.UserInfo[0].firstName,
                       lastName: data.UserInfo[0].lastName,
                       profilePic: data.UserInfo[0].image,
                       email:data.UserInfo[0].email
                     }
                     localStorage.setItem('student-details', JSON.stringify(object));
                     localStorage.setItem('student-auth-token', data.authtoken);
                     console.log(data.authtoken);
                     localStorage.setItem('userRole', data.UserInfo[0].roleId);
                     this.loginHeaderService.setLoginValue(object);
                     this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);
                    // this.router.navigate([]);
                   }
                   else{
                     this.signupPopup.close();
                     this.router.navigate(['../../student/profile/' + data.token]);
                   }
             }
             else if (data.UserInfo[0].roleId == '3') {
               //teacher
               this.signupPopup.close();
               //http://localhost:4200/teacher/generalprofile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDQ3ZmY0NDU0MTM1MDE3NTU4ZjYyNiIsImlhdCI6MTUxNDQzODY0NCwiZXhwIjoxNTE3MDMwNjQ0fQ.LsEXHK9H5CJwrRz951aY80oLdNN4DUDmK6icN5_2lvQ
               this.router.navigate(['../../teacher/generalprofile/' + data.token]);
 
             }
 
           }
         }, (error) => {
 
           // if (error.code == 501) {
           //   this.reg.email = '';
           //   this.registrationResponse = error.message;
           // }
         }
         );
       }
     }, (error) => {
 
     });
   }
  // connectWithGooglePlus() {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((success) => {

  //     if (success.authToken != null) {
  //       var obj = {
  //         email: success.email
  //       }
  //       if (success.email != undefined && success.email != '') {
  //         localStorage.setItem('regfb_email', success.email);
  //       }

  //       var fullName = success.name.split(' ');
  //       if (fullName[0] != undefined) {
  //         localStorage.setItem('regfb_firstName', fullName[0]);
  //       }

  //       if (fullName[1] != undefined) {
  //         localStorage.setItem('regfb_lastName', fullName[1]);
  //       }

  //       this.accountService.userAlreadyExistsOrNot(obj).subscribe((data) => {

  //         if (data.code == '200') {
  //           this.reg = new UserRegistration();
  //           this.reg.isStudent = '1';
  //           this.reg.firstName = localStorage.getItem('regfb_firstName');
  //           this.reg.lastName = localStorage.getItem('regfb_lastName');
  //           if (localStorage.getItem('regfb_email') != null && localStorage.getItem('regfb_email') != null) {
  //             this.reg.email = localStorage.getItem('regfb_email');
  //             this.isEmailFalse = true;
  //           }
  //           this.isSocialSignup = true;
  //           this.loaderService.display(false);

  //         }
  //         else {

  //           if (data.UserInfo[0].roleId == '4') {
  //             //redirect student here
  //             //http://localhost:4200/student/profile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDM0ZTdkMzg5NWQ5MWZmZTNjNDMxMiIsImlhdCI6MTUxNDM2MDQ0NSwiZXhwIjoxNTE2OTUyNDQ1fQ.Ee6Lz7fTmdMv4MJrfZWPnHHYcmiMuKR9MdGhQDMaFK8
  //             this.signupPopup.close();
  //             this.router.navigate(['../../student/profile/' + data.token]);
  //           }
  //           else if (data.UserInfo[0].roleId == '3') {
  //             //teacher
  //             this.signupPopup.close();
  //             //http://localhost:4200/teacher/generalprofile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDQ3ZmY0NDU0MTM1MDE3NTU4ZjYyNiIsImlhdCI6MTUxNDQzODY0NCwiZXhwIjoxNTE3MDMwNjQ0fQ.LsEXHK9H5CJwrRz951aY80oLdNN4DUDmK6icN5_2lvQ
  //             this.router.navigate(['../../teacher/generalprofile/' + data.token]);

  //           }
  //         }
  //       }, (error) => {

  //         // if (error.code == 501) {
  //         //   this.reg.email = '';
  //         //   this.registrationResponse = error.message;
  //         // }
  //       }
  //       );
  //     }
  //   }, function (error) {

  //   });
  // }

}
