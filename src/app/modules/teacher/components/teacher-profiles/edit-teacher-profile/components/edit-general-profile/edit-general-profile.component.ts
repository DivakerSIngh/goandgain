import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';

import { TeacherService } from '../../../../../../../services/teacher.service'
import { StudentService } from '../../../../../../../services/student.service';

import { LoaderService } from '../../../../../../../modules/shared/loader'
import { LoginHeaderService } from '../../../../../../../services/login-header.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";


@Component({
  selector: 'app-edit-general-profile',
  templateUrl: './edit-general-profile.component.html',
  styleUrls: ['./edit-general-profile.component.css']
})
export class EditGeneralProfileComponent implements OnInit {


  formData: any;
  firstName: any;
  lastName: any;
  viewImage: any;
  phoneNumber: any;
  countryCode: any;
  country: any;
  countryName: any;
  timeZone: any;
  email: any;
  mobile: any;
  teachLanguage: any;
  speakLanguage: string = '0';
  countries: any = [];
  countryCodeList: any = [];
  countryList: any = [];
  languagesYouSpeakAndTeach: any = [];
  languagesYouSpeakSelection: any = [];
  noMoreThanFive: boolean = false;
  noSpeakLanguageSelction: boolean = false;
  requiredStatus: any;
  responseMessage:any='';

  constructor(private teacherService: TeacherService,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.formData = new FormData();
    this.getCountriesAndTimeZone();
    this.getcountryCode();
    this.getCountryList();
    // this.getLanguagesYouSpeakAndTeach();
    var teacherDetails = localStorage.getItem('teacher-full-details') || null;
    

    if (teacherDetails != null) {
      var techerInfo = JSON.parse(teacherDetails);
      this.loaderService.display(true);
      this.getTeacherInformation(techerInfo);
      // setTimeout(() => {
      //   this.loaderService.display(false);
      // }, 100000);
    }




  }


  public restrictNumeric(e) {
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


  getLanguagesYouSpeakAndTeach() {
    this.teacherService.getTeacherLanguages().subscribe((data) => {
      if (data.code == '200') {
        this.languagesYouSpeakAndTeach = data.data;
      } else {
      }
    }, error => {
      console.log(error.code)

    });
  }

  getCountryList() {
    this.studentService.getCountriesList().subscribe((data) => {
      if (data.code == '200') {
        this.countryList = data.countries;
      } else {
        // this.router.navigate(['']);
      }
    }, error => {

      this.router.navigate(['']);
      console.log(error.code)
    });

  }


  changeCountry() {
    // let timeZone = this.countries.filter(x => x.counrty == this.country);
    // this.timeZone = timeZone[0].timeZone
    // this.selectcountry = true;

    let timeZone = this.countries.filter(x => x.name == this.country);
    this.timeZone = timeZone[0].offsetStr;
  }
  //get countries and their timezone
  getCountriesAndTimeZone() {
    this.teacherService.getCountriesAndTimeZone().subscribe((data) => {

      if (data.code == '200') {
        
        this.countries = data.data;
        // if (data.ipInfo.timezone != undefined && data.ipInfo.timezone != '') {
        //   // this.country = data.ipInfo.timezone;
        //   // let timeZone = this.countries.filter(x => x.name == this.country);
        //   // this.timeZone = timeZone[0].offsetStr;
        // }

      } else {
        this.router.navigate(['']);
      }
    }, error => {
      console.log(error.code);
      this.router.navigate(['']);
    });
  }



  getTeacherInformation(techerInfo) {
    this.loaderService.display(true);

    if (techerInfo.firstName != undefined) {
      this.firstName = techerInfo.firstName;
    }
    if (techerInfo.lastName != undefined) {
      this.lastName = techerInfo.lastName;
    }
    if (techerInfo.email != undefined) {
      this.email = techerInfo.email;
    }

    if (techerInfo.phoneNumber != undefined) {
      this.mobile = techerInfo.phoneNumber;
    }


    if (techerInfo.image != undefined) {
      this.viewImage = techerInfo.image;
      //this.isProfilePicAlreadySelected = true;
    }
    // if (techerInfo.phoneNumber != undefined) {
    //   this.phoneNumber = techerInfo.phoneNumber;
    // }


    if (techerInfo.countryCode != undefined && techerInfo.countryCode != '') {
      this.countryCode = 0;
      this.countryCode = techerInfo.countryCode;
      //alert(data.tutorsInfo[0].countryCode);
    }
    if (techerInfo.counrty != undefined) {
      this.country = techerInfo.counrty;
    }
    
    if (techerInfo.countryName != undefined) {
      this.countryName = techerInfo.countryName;

      // var details =this.countryList;
    }

    if (techerInfo.timeZone != undefined) {
      this.timeZone = techerInfo.timeZone;
    }

    if (techerInfo.teachLanguage != undefined) {
      this.teachLanguage = techerInfo.teachLanguage;
    }
    this.loaderService.display(false);

  };


  removeLanguageFromList(index) {
    this.noMoreThanFive = false;
    this.speakLanguage = '0';
    this.languagesYouSpeakSelection.splice(index, 1);
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noSpeakLanguageSelction = false;
    } else {
      this.noSpeakLanguageSelction = true;
    }
  }

  getcountryCode() {

    this.teacherService.getCountryCode().subscribe((data) => {
      
      if (data.code == '200') {
        this.countryCodeList = data.data;

        // if (data.ipInfo.countryCode != undefined && data.ipInfo.countryCode != '') {
        //   //this.countryCode=data.ipInfo.countryCode;
        // }
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
      }
    }, error => {
      
      this.router.navigate(['']);
    });
  };


  getImageFromFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (value) => {
        if (value.photoUrl != undefined && value.photoUrl != null) {
          this.viewImage = value.photoUrl;
          //this.isImage = true;
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
        //  this.isImage = true;
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }


  //to add language in the selection list
  changeLanguageYouSpeak($event) {

    if (this.languagesYouSpeakSelection.length < 5) {
      this.noMoreThanFive = false;
      var status = true;
      var index;
      for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
        if (this.languagesYouSpeakSelection[i].value == this.speakLanguage) {
          status = false;
          index = i;
          break;
        }
      }
      if (status) {
        var value = {
          value: this.speakLanguage
        }
        this.languagesYouSpeakSelection.push(value);
        this.noSpeakLanguageSelction = false;
      }
    }
    else {
      this.noMoreThanFive = true;

    }
    this.speakLanguage = '0';
    $event.source.value = '0';
  }




  //checking the valid image
  isValidImage(ext: string): boolean {

    if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
      return false;
    }
    return true;
  }

  //choose image 
  onFileChange(fileInput) {

    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      this.loaderService.display(true);
      let file: File = fileList[0];
      console.log(fileList, file);
      let fileSize: number = fileList[0].size;
      let fileExtenstion = fileList[0].name.split('.').pop();
      if (this.isValidImage(fileExtenstion.toLowerCase())) {
        //500 KB
        if (fileSize <= 512000) {
          this.formData.delete('userImage');
          this.formData.append('userImage', file);
          //this.formData.set('userImage', file);
          this.teacherService.uploadTeacherFiles(this.formData).subscribe((data) => {
            
            if (data.code == '200') {
              this.viewImage = data.imageURL;
              this.requiredStatus = '';
              // this.isImage = true;
              this.loaderService.display(false);
            }
            else {
              this.requiredStatus = 'There is some internal error.';
              //this.isImage = false;
              this.loaderService.display(false);
              //this.router.navigate(['']);
            }


          }, error => {
            
            //this.isImage = true;
            this.requiredStatus = error.message;
            console.log(error.code);
            //this.router.navigate(['']);
          });
          // this.viewImage = fileInput.target.files[0];
          // let reader = new FileReader();
          // reader.onload = (e: any) => {
          //   this.viewImage = e.target.result;
          //   // localStorage.setItem('localImageStorage', this.viewImage);
          //   this.requiredStatus = '';
          //   this.isImage = true;
          //   //this.ifLogoOrNot = e.target.result;
          // }
          // reader.readAsDataURL(fileInput.target.files[0]);

        }
        else {
          this.loaderService.display(false);
          //  this.isImage = false;
          this.requiredStatus = 'File size can not be more than 500 kb.';
        }
      }
      else {
        this.loaderService.display(false);
        // this.isImage = false;
        this.requiredStatus = 'Please upload a valid image.';
      }
    }

  }


  isValid() {

    if (this.viewImage) {
      this.requiredStatus = '';
    }
    else {
      this.requiredStatus = 'Please upload a valid image.'
    }
    if (this.country != '0') {
      //this.selectcountry = true;
    }
    else {
      //this.selectcountry = false;
    }

    if (this.countryName != 0) {
      //this.selectcountryName = true;
    }
    else {
      //   this.selectcountryName = false;

    }
  }
  inValid():boolean {
    if (this.firstName.trim() != '' && this.lastName.trim()!=''
      && this.mobile.trim() != '' && this.country != '' && this.timeZone != ''
      && this.viewImage != '' && this.countryCode != '' && this.countryName != '') {
      return false;
    }
    return true;
  }



  UpdateGeneralDetails() {
    //this.isValid();

    if (this.countryName != '0') {
      if (this.country != '0') {
        if (this.viewImage) {

          this.loaderService.display(true);
          
          let body = new URLSearchParams();
          body.set('firstName', this.firstName.trim());
          body.set('lastName', this.lastName.trim());
          body.set('phoneNumber', this.mobile);
          body.set('counrty', this.country);
          body.set('timeZone',this.timeZone);
          body.set('image', this.viewImage);
          body.set('countryCode', this.countryCode);
          body.set('countryName', this.countryName);
          this.teacherService.reSetupTutorProfile(body).subscribe((data) => {
            this.loaderService.display(false);
            
            if (data.code == '200') {
            this.responseMessage="Request has been sent to admin for approval .";
            } else if (data.code == '401') {
              this.responseMessage="There is some server error."
              //this.requiredMessage=data.message;
              
              //this.router.navigate(['']);
            }
          }, error => {

            console.log(error.code)

          });
        }
      } else {
        // this.selectcountry = false;
        window.scrollTo(0, 0);
      }
    } else {
      //this.selectcountryName = false;
    }
  }


}

