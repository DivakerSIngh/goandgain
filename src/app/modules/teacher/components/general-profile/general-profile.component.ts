import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service';
import { StudentService } from '../../../../services/student.service';

import { LoaderService } from '../../../../modules/shared/loader'
import { HeaderFooterService } from '../../../../modules/shared/header-footer.service'
import { HeaderService } from '../../../../header.service';



import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";

import { LoginHeaderService } from '../../../../services/login-header.service';

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrls: ['./general-profile.component.css'],
  providers: [TeacherService, HeaderFooterService]
})
export class GeneralProfileComponent implements OnInit {


  viewImage: any = "./assets/images/avtar.png";
  formData: any;
  countries: any[] = [];
  varificationId: string;
  country: string = '';
  requiredStatus: string;
  selectcountry: boolean = true;
  selectcountryName: boolean = true;
  timeZone: string = '0';
  isImage: boolean = false;

  firstName: String;
  lastName: string;
  phoneNumber: number;
  noCountryCode: boolean = false;
  isProfilePicAlreadySelected: boolean = false;

  countryCodeList: any = [];
  countryCode: number = 0;

  countryList: any = [];
  countryName: any = 0;
  requiredMessage: any;

  //for multilingual message
  ifInvalid: boolean = false;
  ifSizeExceed: boolean = false;
  ifInternalError: boolean = false;
  //


  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router, private headerService: HeaderService,
    private loaderService: LoaderService,
    private headerFooterService: HeaderFooterService,
    private authService: AuthService,
    private studentService: StudentService,
    private loginHeaderService: LoginHeaderService) {

  }


  changeValue() {
    this.headerService.setHeaderValue(true);
  }

  geolocationPosition: any;
  ngOnInit() {


    this.headerService.setHeaderValue(true);

    this.loaderService.display(true);
    this.formData = new FormData();
    this.varificationId = this.route.snapshot.paramMap.get("id");
    if (this.varificationId) {
      localStorage.clear();
      localStorage.setItem('auth-token', this.varificationId);
      var obj = {}
      this.loginHeaderService.setLoginValue(obj);
    }
    this.country = '0';
    this.getCountriesAndTimeZone();
    this.getcountryCode();
    this.getCountryList();
    // this.currentCountrycode();
    this.getTeacherInformation();


  }

  //getting the client country code

  // currentCountrycode(){
  //   var retrunData=this.teacherService.getClientCountryCode();
  //  }

  //checking the valid image
  isValidImage(ext: string): boolean {

    if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
      return false;
    }
    return true;
  }

  //choose image 
  onFileChange(fileInput) {
    this.loaderService.display(true);
    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
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
          this.teacherService.uploadTeacherProfileImage(this.formData).subscribe((data) => {

            if (data.code == '200') {
              this.ifInvalid = false;
              this.ifSizeExceed = false;
              this.ifInternalError = false;

              this.viewImage = data.imageURL;
              this.requiredStatus = '';
              this.isImage = true;
              // setTimeout(() => this.loaderService.display(false), 4000);
              this.loaderService.display(false)
              
            }
            else {
              this.ifInvalid = false;
              this.ifSizeExceed = true;
              this.ifInternalError = true;
              this.requiredStatus = 'There is some internal error.';
              this.isImage = false;
              this.loaderService.display(false);
              //this.router.navigate(['']);
            }


          }, error => {
            this.ifInvalid = false;
            this.ifSizeExceed = true;
            this.ifInternalError = true;
            this.isImage = true;
            this.requiredStatus = error.message;
            console.log(error.code);
            //this.router.navigate(['']);
          });
        }
        else {
          this.loaderService.display(false);
          this.ifInvalid = false;
          this.ifSizeExceed = true;
          this.isImage = false;
          this.requiredStatus = 'file size can not be more than 500 kb.';
        }
      }
      else {
        this.ifInvalid = true;
        this.ifSizeExceed = false;
        this.loaderService.display(false);
        this.isImage = false;
        this.requiredStatus = 'Please upload a valid image.';
      }
    }

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
  //get teacher information

  //fetching teacher information method
  getTeacherInformation() {

    this.teacherService.getTeacherInformation().subscribe((data) => {

      if (data.code == '200') {

        if (data.tutorsInfo.length > 0) {
          if (data.tutorsInfo[0].firstName != undefined) {
            this.firstName = data.tutorsInfo[0].firstName;
          }
          if (data.tutorsInfo[0].lastName != undefined) {
            this.lastName = data.tutorsInfo[0].lastName;
          }
          if (data.tutorsInfo[0].image != undefined) {
            this.viewImage = data.tutorsInfo[0].image;
            this.isProfilePicAlreadySelected = true;
          }
          if (data.tutorsInfo[0].phoneNumber != undefined) {
            this.phoneNumber = data.tutorsInfo[0].phoneNumber;
          }


          if (data.tutorsInfo[0].countryCode != undefined && data.tutorsInfo[0].countryCode != '') {
            this.countryCode = 0;
            this.countryCode = data.tutorsInfo[0].countryCode;
            //alert(data.tutorsInfo[0].countryCode);
          }
          if (data.tutorsInfo[0].counrty != undefined) {
            this.country = data.tutorsInfo[0].counrty;
          }

          if (data.tutorsInfo[0].countryName != undefined) {
            this.countryName = data.tutorsInfo[0].countryName;

            var details = this.countryList;
          }

          if (data.tutorsInfo[0].timeZone != undefined) {
            this.timeZone = data.tutorsInfo[0].timeZone;
          }
        }
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.router.navigate(['']);
    });
  };




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

























  isValid() {
    
    if (this.isImage || this.isProfilePicAlreadySelected) {
      this.requiredStatus = '';
    }
    else {
      this.ifInvalid = true;
      this.ifSizeExceed = false;
      this.ifInternalError = false;
      this.requiredStatus = 'Please upload a valid image.'
    }
    if (this.country != '0') {
      this.selectcountry = true;
    }
    else {
      this.selectcountry = false;
    }

    if (this.countryName != 0) {
      this.selectcountryName = true;
    }
    else {
      this.selectcountryName = false;

    }
    if (this.countryCode != 0) {
      this.noCountryCode = false;
    } else {
      this.noCountryCode = true;
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






  changeCountry() {
    // let timeZone = this.countries.filter(x => x.counrty == this.country);
    // this.timeZone = timeZone[0].timeZone
    // this.selectcountry = true;

    let timeZone = this.countries.filter(x => x.name == this.country);
    this.timeZone = timeZone[0].offsetStr;
  }
  firstStepOfTeacher() {
    
    this.isValid();
    if (!this.noCountryCode) {
      if (this.countryName != '0') {
        if (this.country != '0') {
          if (this.isImage || this.isProfilePicAlreadySelected) {

            this.loaderService.display(true);
            var obj = {
              firstName: this.firstName.trim(),
              lastName: this.lastName.trim(),
              phoneNumber: this.phoneNumber,
              country: this.country,
              timeZone: this.timeZone,
              image: this.viewImage,
              countryCode: this.countryCode,
              countryName: this.countryName
            }
            
            this.teacherService.saveTeacherFirstStepData(obj).subscribe((data) => {
              this.loaderService.display(false);
              
              if (data.code == '200') {
                this.router.navigate(['../../teacher/language']);
              } else if (data.code == '401') {
                this.requiredMessage = data.message;
                
                //this.router.navigate(['']);
              }
            }, error => {

              console.log(error.code)

            });
          }
        } else {
          this.selectcountry = false;
          window.scrollTo(0, 0);
        }
      } else {
        this.selectcountryName = false;
      }
    }
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

  getImageFromFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (value) => {
        if (value.photoUrl != undefined && value.photoUrl != null) {
          this.viewImage = value.photoUrl;
          this.isImage = true;
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
        this.isImage = true;
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }
}
