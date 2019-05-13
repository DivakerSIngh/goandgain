import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../modules/shared/loader';
import { StudentService } from '../../../../services/student.service'
import { HeaderService } from '../../../../header.service';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { LoginHeaderService } from '../../../../services/login-header.service';

@Component({
  selector: 'app-student-profile-first',
  templateUrl: './student-profile-first.component.html',
  styleUrls: ['./student-profile-first.component.css'],
  providers: [StudentService]
})
export class StudentProfileFirstComponent implements OnInit {

  formData: any;
  varificationId: any;
  viewImage: any = "./assets/images/avtar.png";
  ifLogoOrNot: boolean = true;
  requiredStatus: string;
  isprofilePicSelected: boolean = false;
  isProfilePicAlreadySelected: boolean = false;
  isSocialMediaImage: boolean = false;

//start For Muli-language message
ifInvalidImage:boolean=false;
ifSizeExceeds:boolean=false;
//end

  //@Output() disableParentLinks=new EventEmitter<any>();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private loader: LoaderService,
    private headerService: HeaderService,
    private authService: AuthService,
    private loginHeaderService: LoginHeaderService) {
  }



  ngOnInit() {

    //hiding the 
    this.headerService.setHeaderValue(true);

    this.loader.display(true);
    this.varificationId = this.route.snapshot.paramMap.get("id");

    if (this.varificationId) {

      localStorage.clear();

      localStorage.setItem('auth-token', this.varificationId);
      localStorage.setItem('varificationId', this.varificationId);
      var obj = {}
      this.loginHeaderService.setLoginValue(obj);
    }
    this.formData = new FormData();

    //fetching the student information
    this.getStudentInformation();
  }




  //fetching student information method
  getStudentInformation() {

    this.studentService.getStudentInformation().subscribe((data) => {
      
      this.loader.display(false);
      if (data.code == '200') {

        // if (data.data[0].profileStepFour!=undefined && data.data[0].profileStepFour==true) {
        //redirect student to his main index page
        //this.router.navigate(['']);

        if (data.data.length > 0) {

          if (data.data[0].image != undefined) {
            this.viewImage = data.data[0].image;
            this.isProfilePicAlreadySelected = true;

          }
        }
        else {
          this.router.navigate(['']);
        }

      } else {
        this.router.navigate(['']);
      }
    }, error => {
      this.loader.display(false);
      this.router.navigate(['']);
    });
  };

  //checking the valid image
  isValidImage(ext: string): boolean {
    if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
      return false;
    }
    return true;
  }

  //choose image 
  onFileChange(fileInput) {
    this.isprofilePicSelected = true;
    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(fileList, file);
      let fileSize: number = fileList[0].size;
      let fileExtenstion = fileList[0].name.split('.').pop();
      if (this.isValidImage(fileExtenstion.toLowerCase())) {
        //500 KB
        if (fileSize <= 512000) {

          this.ifInvalidImage=false;
          this.ifSizeExceeds=false;

          this.loader.display(true);
          // this.formData.set('userImage', file);
          this.formData.delete('userImage');
          this.formData.append('userImage', file);
          this.viewImage = fileInput.target.files[0];
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.viewImage = e.target.result;
            this.isSocialMediaImage = false;
            localStorage.setItem('localImageStorage', this.viewImage);
            this.requiredStatus = '';
            this.ifLogoOrNot = e.target.result;
            this.loader.display(false);
          }
          reader.readAsDataURL(fileInput.target.files[0]);
        }
        else {
          this.ifInvalidImage=false;
          this.ifSizeExceeds=true;        

          this.isprofilePicSelected = false;
          this.requiredStatus = 'File size can not be more than 500 kb.';
          this.loader.display(false);
        }
      }
      else {
        this.ifInvalidImage=true;
        this.ifSizeExceeds=false; 
        this.isprofilePicSelected = false;
        this.requiredStatus = 'Please upload a valid image.';
        this.loader.display(false);
      }
    }
  }

  //to go to second step of the 


  goToSecondStep() {

    this.loader.display(true);

    if (this.isSocialMediaImage != true) {

      if (this.isprofilePicSelected) {
        console.log(this.formData.get('userImage'));
        this.studentService.saveStudentVerificationFirstStepData(this.formData).subscribe((data) => {

          if (data.code == '200') {
            this.router.navigate(['../../student/student-profile-second-step']);
          }
          else {

            this.router.navigate(['']);
          }
        }, error => {
          console.log(error.code);
          this.router.navigate(['']);
        });
      }
      else if (this.isProfilePicAlreadySelected) {
        this.router.navigate(['../../student/student-profile-second-step']);
      }
      else {
        this.loader.display(false);
        this.ifInvalidImage=true;
        this.requiredStatus = 'Please select a valid image first.';
      }
    } else {

      this.studentService.saveStudentVerificationFromSocialMediaFirstStepData(this.viewImage).subscribe((data) => {
        if (data.code == '200') {
          this.router.navigate(['../../student/student-profile-second-step']);
        }
        else {
          this.router.navigate(['']);
        }
      }, error => {

        console.log(error.code);
        this.router.navigate(['']);
      });
    }
  }

  getImageFromFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (value) => {
        if (value.photoUrl != undefined && value.photoUrl != null) {
          this.viewImage = value.photoUrl;
          this.isSocialMediaImage = true;
        }
        else {
          this.isSocialMediaImage = false;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  connectWithGooglePlus() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((success) => {
      if (success.photoUrl != undefined && success.photoUrl != null) {
        this.viewImage = success.photoUrl;
        this.isSocialMediaImage = true;
      } else {
        this.isSocialMediaImage = false;
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
