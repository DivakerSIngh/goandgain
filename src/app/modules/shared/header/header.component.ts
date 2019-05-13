import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistration } from '../../../models/user-registration';
import { ClickOutsideModule } from 'ng-click-outside';

import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service'
import { StudentService } from '../../../services/student.service'
import { LoaderService } from '../../../modules/shared/loader';

import { HeaderFooterService } from '../../../modules/shared/header-footer.service';

import { HeaderService } from '../../../header.service';
import { LoginHeaderService } from '../../../services/login-header.service';
import { LoginPopupService } from '../../../services/login-popup.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { TranslateService } from 'ng2-translate';


declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AccountService, StudentService]
})
export class HeaderComponent implements OnInit {


  //local variables
  @ViewChild('loginmodal') login: ElementRef;
  @ViewChild('resetPassword') resetPassword: ElementRef;

  isMenu: Boolean = false;
  isToggle: Boolean = false;
  isStudyToggle: Boolean = false;
  fixedBodywrapper = false;
  //--------- mobile menu ----

  //--------- mobile menu closed ----
  signingInText: string = "Sign In";
  reg: UserRegistration;
  signIn: UserRegistration;
  regfirstName: string;
  regemail: string;
  registrationResponse: string;
  isStudent: Boolean = true;
  isTutor: Boolean = false;
  signupPopup: NgbModalRef;
  forgotMail: string;
  dynamicFormControl: any;
  forgotPasswordStatus: string;
  allowOrNot: boolean = true;
  isEmailFalse: boolean = false;
  isSocialSignup: boolean = false;
  isLoggedIn: boolean = false;

  loginStatus: string;
  varificationLink: string = '';



  noMailFound: boolean = false;
  inCompleteRegistation: boolean = false;

  //after login details

  userFullName: string = '';
  userProfilePic: string = '';
  userRole:number=0;

  //focus on validation 
  isfocus: string = '';

  studentUrl: string = '../../student/student-profile/lessons/scheduled-lesson';
  teacherUrl: string = '';


  pattern = "/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/";

  //password pattern
  passwordPattern: string = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,20}/';



  //reset password
  id: string;
  passwordDoNotMatch: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  resetPasswordResponse: string;


  inValidCredentials:boolean=false;
  networkError:boolean=false;
  constructor(private modalService: NgbModal, private accountService: AccountService,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private headerFooterService: HeaderFooterService,
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router,
    private loginHeaderService: LoginHeaderService,
    private loginPopupService: LoginPopupService,
    private route: ActivatedRoute,
    private translate: TranslateService) { }


//--------------------------
onClickedOutside(e: Event) {
  this.isMenu = false;
  console.log('Clicked outside:', e);
}

//-------------- header toggle btn -----
toggleSideMenu() {
  this.isMenu = !this.isMenu
}
togglelanguagedrop() {
  this.isToggle = !this.isToggle
}
togglestudy() {
  this.isStudyToggle = !this.isStudyToggle
}

  //-------------- header toggle btn -----

  ngOnInit() {


    console.log(this.resetPassword);

    //intilize the variable
    this.isSocialSignup = false;
    this.reg = new UserRegistration();
    this.reg.isStudent = '1';

    this.signIn = new UserRegistration();
    this.signIn.isStudent = '1';
    this.isEmailFalse = false;


    //checking for popup if needs to open
    this.loginPopupService.bs.subscribe((val: any) => {

      //here checking if needs to open login popup
      //Request for creating study groups
      if (val.status != undefined && val.status == true && val.url != undefined) {
        this.studentUrl = val.url;
        this.open(this.login);
      }
      else if(val.redirectToPracticeRoom!=undefined && val.redirectToPracticeRoom==true ) {
        this.studentUrl = val.url;
        this.open(this.login);
      }
      else {
        if (this.signupPopup) {
          this.signupPopup.close();
        }
      }

      //here checking if need to open resetpassword popup   
      if (val.resetPassword != undefined && val.resetPassword != null && val.resetPassword != '') {
        // passowrd detials here
        this.loaderService.display(true);
        this.id = val.resetPassword;
        this.studentService.getResetPasswordDetails(val.resetPassword).subscribe((data) => {
          
          if (data.code == '200') {
            this.resetPasswordButton = 'Submit';
            this.signupPopup = this.modalService.open(this.resetPassword);

          }
          else {
            if (this.signupPopup) {
              this.signupPopup.close();
            }
          }
          this.loaderService.display(false);
        }, error => {
          
          this.loaderService.display(false);
          if (this.signupPopup) {
            this.signupPopup.close();
          }
        });
      }
    });

    // //Here checking if user logged in or not 
    this.loginHeaderService.bs.subscribe((val: any) => {
      
      if (val.firstName != undefined || val.lastName != undefined || val.profilePic != undefined) {
        this.isLoggedIn = true;
        if (val.firstName) {
          this.userFullName = val.firstName + ' ' + val.lastName;
          this.userProfilePic = val.profilePic;
          this.userRole=val.userRole;
        }
     }else if(val.islogOut!=undefined && val.islogOut==true) {
        this.isLoggedIn = false;
      }
    });
    this.headerService.bs.subscribe((x) => {
     // console.log('=============', x);
      this.allowOrNot = x;
    })

  }



  ngAfterViewInit() {
    $(".notification-click").click(function (e) {
      e.stopPropagation();
      if ($(this).hasClass('clicked')) {
        $(".notification-header").fadeOut(300);
        $('.fixed-bodywrapper').removeClass('show');
        $(this).removeClass('clicked');
      } else {
        $(".notification-header").fadeIn(100);
        $('.fixed-bodywrapper').addClass('show');
        $(this).addClass('clicked');
      }
    })
    $("body").click(function () {
      $(".notification-header").fadeOut(300);
      $('.fixed-bodywrapper').removeClass('show');
      $('.notification-click').removeClass('clicked');
    });

  }

  setInputFocus() {
    //this.isfocus='focus';
    // console.log('setInputFocus')
  }

  setInputFocusOut() {
    // console.log('setInputFocusOut');
    this.isfocus = '';
  }

  logOut() {
    
    localStorage.clear();
    var obj={
      islogOut:true
    }
    this.loginHeaderService.setLoginValue(obj);
    this.router.navigate(['/']);
  }

  //check for headers
  //this method is not being used
  chckForHeaders() {
    if (localStorage.getItem('auth-token') != undefined) {
      this.studentService.checkForHeaders().subscribe((data) => {
        if (data.code == '200') {
          this.allowOrNot = !data.headerStatus;
        }

      }, error => {
        if (error.code == 501) {
          this.reg.email = '';
          this.registrationResponse = error.message;
        }
      }
      );
    }
    else {
      this.allowOrNot = false;
    }
  }
  closeResult: string;


  //for opening any popup in this page
  open(content) {
    this.networkError=false;
    this.inCompleteRegistation=false;
    this.signingInText = "Sign In";
    this.registrationResponse = '';
    this.loginStatus = '';
    this.isEmailFalse = false;
    this.forgotMail = '';
    this.reg = new UserRegistration();
    this.reg.isStudent = '1';
    this.signIn = new UserRegistration();
    this.signIn.isStudent = '1';
    if (this.signupPopup) {
      this.signupPopup.close();
    }
    this.signupPopup = this.modalService.open(content);
  }

  openSecond() {
    this.open(this.login);
  }


  //sign up method
  alredyExists:boolean=false;
  signUp(content) {

    this.loaderService.display(true);
    this.dynamicFormControl = content;
    this.reg.isSocial = this.isSocialSignup;
    var values = this.reg;

    this.accountService.signup(values).subscribe((data) => {
      if (data.code == '200') {
        this.reg = new UserRegistration();
        this.reg.isStudent = '1';
        this.signupPopup.close();
        this.loaderService.display(false);
        if (!this.isSocialSignup) {


          //role 4 for student and 3 for teacher


          //by pass the mail issue
          if (data.UserInfo.roleId == '4') {
            //redirect student here
            this.varificationLink = 'https://koalatalk.appnationz.com/student/profile/' + data.token;
          }
          else if (data.UserInfo.roleId == '3') {
            //redirect teacher here
           // this.varificationLink = 'http://52.8.169.78:7112/teacher/generalprofile/' + data.token;
           this.varificationLink = 'https://koalatalk.appnationz.com/teacher/generalprofile/' + data.token;
           
          }
          //end by pass mail issue
           
          //opening the confirmation popup here
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
        var elsePart = setTimeout(() => {
          this.registrationResponse = '';


        }, 5000);
      }
    }, error => {
      
      if (error.code == 501) {
        //if user exists already
        // this.reg.email = '';
        this.alredyExists=true;
        this.registrationResponse = error.message;
        this.loaderService.display(false);
        var errorPart = setTimeout(() => {
          this.registrationResponse = '';
          this.alredyExists=false;
        }, 5000);
      }
    }
    );
  }

  forgotPassword(content) {

    this.dynamicFormControl = content;
    var email = this.forgotMail;
    this.accountService.forgotPassword(email).subscribe((data) => {
      if (data.code == '200') {
        this.noMailFound = false;
        this.reg = new UserRegistration();
        this.reg.isStudent = '1';
        this.signupPopup.close();
        this.open(this.dynamicFormControl);
      }
      else if (data.code == '404') {
        this.noMailFound = true;
        //this.forgotMail='';
        var fourZeroFourMessage = setTimeout(() => {
          this.noMailFound = false;

        }, 6000);
        this.forgotPasswordStatus = data.message;
      }

    }, error => {

      // if (error.code == 501) {
      //   this.reg.email = '';
      //   this.registrationResponse = error.message;
      // }
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
            this.reg = new UserRegistration();
            this.reg.isStudent = '1';
            this.reg.firstName = localStorage.getItem('regfb_firstName');
            this.reg.lastName = localStorage.getItem('regfb_lastName');
            if (localStorage.getItem('regfb_email') != null && localStorage.getItem('regfb_email') != null) {
              this.reg.email = localStorage.getItem('regfb_email');
              this.isEmailFalse = true;
            }
            this.loaderService.display(false);
            this.isSocialSignup = true;

          }
          else {
            if (data.UserInfo[0].roleId == '4') {
              //4 from student
              if (data.UserInfo[0].status == '1') {

                this.signupPopup.close();
                var object = {
                  firstName: data.UserInfo[0].firstName,
                  lastName: data.UserInfo[0].lastName,
                  profilePic: data.UserInfo[0].image,
                  email: data.UserInfo[0].email,
                  userRole :data.UserInfo[0].roleId
                }
                localStorage.setItem('student-details', JSON.stringify(object));
                localStorage.setItem('student-auth-token', data.token);
                console.log(data.authtoken);
                localStorage.setItem('userRole', data.UserInfo[0].roleId);
                localStorage.setItem('student-id', data.UserInfo[0]._id);
                this.loginHeaderService.setLoginValue(object);
                this.router.navigate([this.studentUrl]);
                //this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);
              }
              else {
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
  connectWithGooglePlus() {
    
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((success) => {

      if (success.authToken != null) {
       if(success.email != undefined ){
        var obj = {
          email: success.email
        }
      }
        if (success.email != undefined && success.email != '') {
          localStorage.setItem('regfb_email', success.email);
        }

        var fullName = success.name.split(' ');
        if (fullName[0] != undefined) {
          localStorage.setItem('regfb_firstName', fullName[0]);
        }

        if (fullName[1] != undefined) {
          localStorage.setItem('regfb_lastName', fullName[1]);
        }

        this.accountService.userAlreadyExistsOrNot(obj).subscribe((data) => {

          if (data.code == '200') {
            this.reg = new UserRegistration();
            this.reg.isStudent = '1';
            this.reg.firstName = localStorage.getItem('regfb_firstName');
            this.reg.lastName = localStorage.getItem('regfb_lastName');
            if (localStorage.getItem('regfb_email') != null && localStorage.getItem('regfb_email') != null) {
              this.reg.email = localStorage.getItem('regfb_email');
              this.isEmailFalse = true;
            }
            this.isSocialSignup = true;
            this.loaderService.display(false);

          }
          else {

            if (data.UserInfo[0].roleId == '4') {
              //redirect student here
              //http://localhost:4200/student/profile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDM0ZTdkMzg5NWQ5MWZmZTNjNDMxMiIsImlhdCI6MTUxNDM2MDQ0NSwiZXhwIjoxNTE2OTUyNDQ1fQ.Ee6Lz7fTmdMv4MJrfZWPnHHYcmiMuKR9MdGhQDMaFK8
              this.signupPopup.close();
              this.router.navigate(['../../student/profile/' + data.token]);
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
    }, function (error) {

    });
  }




  changeStatusMessage() {
    this.loginStatus = '';
  }

  //login here
  signingIn() {
    this.signingInText = "Loding...";
    this.inCompleteRegistation = false
    // this.loaderService.display(true);
    var values = this.signIn;

    //storing if registration is incomplete.
    localStorage.setItem('resendMail', this.signIn.email);


    this.accountService.signIn(values).subscribe((data) => {

      if (data.code == '200') {
        localStorage.removeItem('resendMail');
        this.signupPopup.close();
        var object = {
          firstName: data.data[0].firstName,
          lastName: data.data[0].lastName,
          profilePic: data.data[0].image,
          email: data.data[0].email,
          userRole: data.data[0].roleId
        }

        //Here checking the role of user
        //Role 4 is for student

        if (data.data[0].roleId == '4') {

          localStorage.setItem('student-details', JSON.stringify(object));
          localStorage.setItem('student-auth-token', data.authtoken);
          localStorage.setItem('student-id', data.data[0]._id);
          localStorage.setItem('student-full-details', JSON.stringify(data.data[0]));
          console.log(data.authtoken);
          localStorage.setItem('userRole', data.data[0].roleId);
          this.loginHeaderService.setLoginValue(object);
          // this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);         

          this.router.navigate([this.studentUrl]);



        }
        //Role 3 is for teacher
        else if (data.data[0].roleId == '3') {
          // 
          localStorage.setItem('teacher-details', JSON.stringify(object));
          localStorage.setItem('teacher-auth-token', data.authtoken);
          localStorage.setItem('teacher-id', data.data[0]._id);
          localStorage.setItem('teacher-full-details', JSON.stringify(data.data[0]));
          console.log(data.authtoken);
          localStorage.setItem('userRole', data.data[0].roleId);
          this.loginHeaderService.setLoginValue(object);
          this.router.navigate(['../../teacher/profile']);
        }
      }
      else if (data.code == '510') {

        // if invalid credentials
        this.inValidCredentials=true;
        this.signingInText = "Sign In";
        this.inCompleteRegistation = false;
        this.loginStatus = data.message;
        this.loaderService.display(false);
        var removeFiveOneTen = setTimeout(() => {
          this.loginStatus = '';
          this.inValidCredentials=false;
        }, 5000);

      }
      else if (data.code == '511' ||data.code == '513') {
        
        //if registration is incomplete
        this.signingInText = "Sign In";
        this.loginStatus = data.message;
        this.inCompleteRegistation = true;
        this.loaderService.display(false);
        var removeFiveOneOne = setTimeout(() => {
          this.loginStatus = '';
          this.inCompleteRegistation = false;
        }, 8000);
      }
      else {
        
        //else block, if no condition matches
        this.networkError=true;
        this.signingInText = "Sign In";
        this.inCompleteRegistation = false;
        this.loaderService.display(false);
        this.loginStatus = data.message;
        var elsePart = setTimeout(() => {
          this.loginStatus = '';

        }, 5000);
      }
    }, error => {
      //if error occured
      if (error.code == 501) {
        this.loginStatus = error.message;
        this.signingInText = "Sign In";
        var errorPart = setTimeout(() => {
          this.loginStatus = '';
        }, 5000);
      }
    }
    );
  }



  loginWithFacebook(content) {
    //this.loaderService.display(true);
    //setTimeout(() => this.loaderService.display(true), 4000);
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
            //if use not exists in db and ready for new registation 
            this.dynamicFormControl = content;
            this.open(this.dynamicFormControl);
            this.reg = new UserRegistration();
            this.reg.isStudent = '1';
            this.reg.firstName = localStorage.getItem('regfb_firstName');
            this.reg.lastName = localStorage.getItem('regfb_lastName');
            if (localStorage.getItem('regfb_email') != null) {
              this.reg.email = localStorage.getItem('regfb_email');
              this.isEmailFalse = true;
            }
            this.loaderService.display(false);
            this.isSocialSignup = true;
          }
          else {
            if (data.UserInfo[0].roleId == '4') {
            
              //4 from student and status 1 for active student
              if (data.UserInfo[0].status == '1') {
                this.signupPopup.close();
                var object = {
                  firstName: data.UserInfo[0].firstName,
                  lastName: data.UserInfo[0].lastName,
                  profilePic: data.UserInfo[0].image,
                  email: data.UserInfo[0].email,
                  userRole: data.data[0].roleId
                  
                }
                localStorage.setItem('student-details', JSON.stringify(object));
                localStorage.setItem('student-auth-token', data.token);
                console.log(data.authtoken);
                localStorage.setItem('userRole', data.UserInfo[0].roleId);
                this.loginHeaderService.setLoginValue(object);
                //this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);
                this.router.navigate([this.studentUrl]);
              }
              else {
                //if student has not completed their registration
                this.signupPopup.close();
                this.router.navigate(['../../student/profile/' + data.token]);
              }
            }
            else if (data.UserInfo[0].roleId == '3') {
              //3 for teacher 

              //here checking if teacher exists or not

              if (data.UserInfo[0].status == '1') {
                this.signupPopup.close();
                var object = {
                  firstName: data.UserInfo[0].firstName,
                  lastName: data.UserInfo[0].lastName,
                  profilePic: data.UserInfo[0].image,
                  email: data.UserInfo[0].email,
                  userRole: data.data[0].roleId
                }
                localStorage.setItem('teacher-details', JSON.stringify(object));
                localStorage.setItem('teacher-auth-token', data.authtoken);
                localStorage.setItem('teacher-id', data.data[0]._id);
                console.log(data.authtoken);
                localStorage.setItem('userRole', data.data[0].roleId);
                this.loginHeaderService.setLoginValue(object);
                this.router.navigate(['../../teacher/profile']);
              }
              else {
                //if student has not completed their registration
                this.signupPopup.close();
                this.router.navigate(['../../teacher/generalprofile/' + data.token]);
              }

              this.signupPopup.close();
              //http://localhost:4200/teacher/generalprofile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNDQ3ZmY0NDU0MTM1MDE3NTU4ZjYyNiIsImlhdCI6MTUxNDQzODY0NCwiZXhwIjoxNTE3MDMwNjQ0fQ.LsEXHK9H5CJwrRz951aY80oLdNN4DUDmK6icN5_2lvQ
              // this.router.navigate(['../../teacher/generalprofile/' + data.token]);
            }
          }
        }, (error) => {

          // if (error.code == 501) {
          //   this.reg.email = '';
          //   this.registrationResponse = error.message;
          // }
        });
      }
    }, (error) => {

    });
  }
mailSentSuccessfully:boolean=false;
  resendMail() {
    this.loaderService.display(true);
    var email = localStorage.getItem('resendMail');
    this.studentService.resendMail(email).subscribe((data) => {
      this.inCompleteRegistation = false;
      this.loaderService.display(false);
      if (data.code == '200') {
      this.mailSentSuccessfully=true;
      this.inCompleteRegistation=false;
        localStorage.removeItem('resendMail');
        this.loginStatus = data.message;
        this.loaderService.display(false);
        var resendMailMessage = setTimeout(() => {
          this.loginStatus = '';
          this.mailSentSuccessfully=false;
        }, 5000);
      }
      else if (data.code == '510') {
        this.inCompleteRegistation = false;
        // this.loaderService.display(false);
        this.loginStatus = data.message;
        this.loaderService.display(false);
        var fiveOneZero = setTimeout(() => {
          this.loginStatus = '';
        }, 5000);
      }
    }, error => {
      this.inCompleteRegistation = false;
      this.loaderService.display(false);
      if (error.code == 501) {
        // this.reg.email = '';
        this.loginStatus = error.message;
        var errorPart = setTimeout(() => {
          this.loginStatus = '';

        }, 5000);
      }
    });


  }

  // loginWithGooglePlus() {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((success) => {
  //     
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
  //         
  //         // if (error.code == 501) {
  //         //   this.reg.email = '';
  //         //   this.registrationResponse = error.message;
  //         // }
  //       }
  //       );
  //     }
  //   }, function (error) {
  //     
  //   });
  // }



  //go to student dashboard

  goToStudentDashboard() {
    this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);
  }
  goToTeacherDashboard() {
    
    this.router.navigate(['../../teacher/profile']);
  }



  resetPasswordMethod() {
    this.resetPasswordButton = 'Loding...'
    if (!this.passwordDoNotMatch && this.newPassword == this.confirmPassword) {
      this.loaderService.display(true);
      var obj = {
        newpassword: this.newPassword,
        token: this.id
      }
      this.accountService.resetPassword(obj).subscribe((data) => {
        this.loaderService.display(false);
        if (data.code == '200') {

          this.resetPasswordResponse = data.message;
          this.resetPasswordButton = 'Submit';
          setTimeout(() => {
            
            if (this.signupPopup) {
              this.signupPopup.close();
            }




            this.router.navigate(['']);

          }, 2000);
        }
      }, error => {
        this.resetPasswordButton = 'Submit';
        this.loaderService.display(false);
        this.router.navigate(['']);
        //this.resetPasswordResponse=error.message;
        //console.log(error.code);
      });
    }
    else {
      this.passwordDoNotMatch = true;
    }
  }
  changeMessage() {
    this.passwordDoNotMatch = false;
  }
  resetPasswordButton: string = 'Submit';
  changeMessageNewPass() {
    this.resetPasswordResponse = '';
    this.passwordDoNotMatch = false;
    this.confirmPassword = '';
  }
  changeMessageConfirmPassword() {
    this.resetPasswordResponse = '';
    if (this.newPassword != this.confirmPassword && this.confirmPassword.length > 7) {
      this.passwordDoNotMatch = true;
    }
    else {
      this.passwordDoNotMatch = false;
    }
  }


  /////////////////-----------------Change Language-----------------------//////////////
changeLanguage(language) {
      localStorage.setItem('preferLanguage',language);
      this.translate.use(language);
    
  }





}
