import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader';
import { StudentService } from '../../../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";


import { LoginHeaderService } from '../../../../../services/login-header.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private loginHeaderService: LoginHeaderService) { }

  studentImage: any;
  studentFirstName: any;
  studentLastName: any;
  studentEmail: any;
  studentCountry: any;
  studenttimeZone: any;

  isInternaleError: boolean = false;
  isInvalidImage: boolean = false;
  isImageSizeExceed: boolean = false;


  languagesYouSpeakSelection: any = [];
  countries: any = [];
  countryList: any = [];
  languagesYouSpeak: any = [];
  country: string = '0';
  currentTimeZone: any;
  selecteLanguages = '0';
  learningLanguage: any = 0;
  formData: any;

  countryName: any;
  timeZone: string = '';
  studentAdditionalInformation: string = '';
  noMoreThanFive: boolean = false;
  studentRate: any;
  ngOnInit() {
    this.formData = new FormData();
    this.GetCountriesAndTimeZone();
    this.getCountryList();
    this.getLanguagesYouSpeak();
    this.GetStudentInformation();
  }




  getLanguagesYouSpeak() {
    this.studentService.getStudentLanguages().subscribe((data) => {
      if (data.code == '200') {
        this.languagesYouSpeak = data.data;
      } else {
      }
    }, error => {
      console.log(error.code);
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

      //  this.router.navigate(['']);
      console.log(error)
    });
  }
  GetCountriesAndTimeZone() {

    this.studentService.getCountriesAndTimeZone().subscribe((data) => {

      if (data.code == '200') {
        this.countries = data.data;
        if (data.ipInfo != undefined && data.ipInfo.timezone != undefined && data.ipInfo.timezone != '') {
          this.currentTimeZone = data.ipInfo.timezone;
        }
      } else {

        // this.router.navigate(['']);
      }
    }, error => {

      console.log(error.code)
    });
  }

  GetStudentInformation() {
    this.loaderService.display(true);
    this.studentService.viewStudentInfo().subscribe((data) => {

      
      if (data.code == '200') {


        if (data.data.length > 0) {

          //binding data
          this.studentImage = data.data[0].image;
          this.studentFirstName = data.data[0].firstName;
          this.studentLastName = data.data[0].lastName;
          this.studentEmail = data.data[0].email;
          this.studentRate = data.data[0].rate;
          this.studentAdditionalInformation = data.data[0].additionalInfo;

          //this.countryName=data.data[0].countryName;
          this.learningLanguage = data.data[0].mainlanguage;
          if (data.data[0].languages != undefined) {
            for (let i = 0; i < data.data[0].languages.length; i++) {
              var value = {
                value: data.data[0].languages[i]
              }
              this.languagesYouSpeakSelection.push(value);
              //this.noLanguageSelction = false;
            }
          }

          if (data.data[0].counrty != undefined) {
            this.country = data.data[0].counrty;
          }
          else {
            // this was for auto timezone
            this.country = this.currentTimeZone;
            if (this.country != undefined) {
              let timezone = this.countries.filter(x => x.name == this.country);
              //let timezone = this.countries.filter(x => x.name =='dt');

              if (timezone != undefined) {

              }
            }
            //
            // this.timeZone = timezone[0].offsetStr;
          }

          if (data.data[0].timeZone != undefined) {
            this.timeZone = data.data[0].timeZone;
          }
          else {
            // this.country=this.currentTimeZone;
            // let timezone = this.countries.filter(x => x.name == this.country);
            // this.timeZone = timezone[0].offsetStr;
          }

          if (data.data[0].countryName != undefined) {
            this.countryName = data.data[0].countryName;
          }


          // let timezone = this.countries.filter(x => x.name == this.country);
          // this.timeZone = timezone[0].offsetStr;


          this.loaderService.display(false);
        }
      }
      this.loaderService.display(false);
    }, error => {

      //   if (error.code == 501) {
      // this.router.navigate(['']);
      // }
    });
  };



  //to add language in the selection list
  selectLanguageYouSepak($event) {

    if (this.languagesYouSpeakSelection.length < 5) {

      this.noMoreThanFive = false;
      var status = true;
      var index;
      for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
        if (this.languagesYouSpeakSelection[i].value == this.selecteLanguages) {
          status = false;
          index = i;
          break;
        }
      }
      if (status) {
        var value = {
          value: this.selecteLanguages
        }
        this.languagesYouSpeakSelection.push(value);
        //this.noLanguageSelction = false;
      }
      // this.selecteLanguages='';
      //this.languageDropdown.nativeElement.value = '0';

      // else{
      //   this.selecteLanguages = '0';
      //   this.languagesYouSpeakSelection.splice(index, 1);
      // }
    }
    else {
      this.noMoreThanFive = true;
      setTimeout(() => {
        this.noMoreThanFive = false;
      }, 5000);

    }
    this.selecteLanguages = '0';
    $event.source.value = '0';

  }

  removeLanguageFromList(index) {
    //  this.noMoreThanFive = false;
    this.selecteLanguages = '0';
    this.languagesYouSpeakSelection.splice(index, 1);
    if (this.languagesYouSpeakSelection.length > 0) {
      //  this.noLanguageSelction = false;
    } else {
      //this.noLanguageSelction = true;
    }
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
    // this.isprofilePicSelected = true;
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
          this.studentService.uploadstudentFiles(this.formData).subscribe((data) => {
            if (data.code = '200') {

              this.studentImage = data.imageURL;
              setTimeout(() => {
                this.loaderService.display(false);
              }, 1000);
            }
            else {
              this.isInternaleError = true;
              this.isInvalidImage = false;
              this.isImageSizeExceed = false;
              this.loaderService.display(false);
            }

          }, error => {
            this.isInternaleError = true;
            this.isInvalidImage = false;
            this.isImageSizeExceed = false;
            this.loaderService.display(false);
          });

        }
        else {
          this.isInternaleError = false;
          this.isInvalidImage = false;
          this.isImageSizeExceed = true;
          this.loaderService.display(false);
        }
      } else {
        this.isInternaleError = false;
        this.isInvalidImage = true;
        this.isImageSizeExceed = false;
        this.loaderService.display(false);
      }
    }
  }



  changeCountry() {
    //this.noMoreThanFive = false;
    let timezone = this.countries.filter(x => x.name == this.country);
    this.timeZone = timezone[0].offsetStr;
    //this.noCountrySelected = false;
  }
  UpdateProfile() {

    if(this.languagesYouSpeakSelection.length>0){
    var speakLang = [];
    for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
      speakLang.push(this.languagesYouSpeakSelection[i].value)
    }
    var editData = {
      firstName: this.studentFirstName,
      lastName: this.studentLastName,
      languages: speakLang,
      mainlanguage: this.learningLanguage,
      rate: this.studentRate,
      additionalInfo: this.studentAdditionalInformation,
      countryName: this.countryName,
      timeZone: this.timeZone,
      counrty: this.country,
      image: this.studentImage
    }
    console.log(JSON.stringify(editData));
    this.studentService.editStudentProfile(editData).subscribe((data) => {
      
      if (data.code == '200') {
        var object = {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          profilePic: data.data.image,
          email: data.data.email,
          userRole: data.data.roleId
        }
        localStorage.removeItem('student-details');
        localStorage.setItem('student-details', JSON.stringify(object));
        this.loginHeaderService.setLoginValue(object);
        this.router.navigate(['student/student-profile/lessons/scheduled-lesson']);
        //
      } else {
      }
    }, error => {
      
      console.log(error.code);
    });
  }
  }
  GetImageFromFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (value) => {
        if(value.photoUrl!=undefined && value.photoUrl!=null){
          this.studentImage = value.photoUrl;
        }
        else{
         //here if there is error in facebook 
        }
      },
      (error) => {
         //here if there is error in google 
        console.log(error);
      }
    )
  }

  GetImageFromGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((success) => {
      
      if(success.photoUrl!=undefined && success.photoUrl!=null){
        this.studentImage = success.photoUrl;
      }
      else
      {
        //here if there is error in google 
      }
    },
      (error) => {
         //here if there is error in google 
        console.log(error);
      }
    );
  }
}
