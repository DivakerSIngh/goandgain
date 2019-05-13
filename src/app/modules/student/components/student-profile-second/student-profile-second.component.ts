import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StudentService } from '../../../../services/student.service'
import { LoaderService } from '../../../../modules/shared/loader'

import { HeaderService } from '../../../../header.service';
import { empty } from 'rxjs/Observer';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-student-profile-second',
  templateUrl: './student-profile-second.component.html',
  styleUrls: ['./student-profile-second.component.css'],
  providers: [StudentService]
})
export class StudentProfileSecondComponent implements OnInit {

  @ViewChild('selectLanguages') languageDropdown: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private headerService: HeaderService) { }
    varificationId: any;

  languagesYouSpeakSelection: any[] = [];
  languagesYouSpeak: any[] = [];
  countries: any[] = [];
  countryList:any=[];
  selecteLanguages: string;
  noLanguageSelction: boolean = false;
  currentTimeZone:any;
  currentCountry:any;
  countryName:any=0;

  country: string = '0';
  noCountrySelected: boolean = false;
  noCountryNameSelected:boolean=false;
  noTimeZone: boolean = false;
  timeZone: string = '0';
  noMoreThanFive: boolean = false;

  ngOnInit() {

    this.headerService.setHeaderValue(true);

    this.selecteLanguages = '0';
    this.getLanguagesYouSpeak();
    let varificationId = localStorage.getItem('varificationId') || null;
    if (varificationId) {
      this.varificationId = varificationId;
    }
    this.getCountryList();
    this.getCountriesAndTimeZone();
    this.getStudentInformation();
  }


  getCountryList(){
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

  //get student full information
  getStudentInformation() {
    this.loaderService.display(true);
    this.studentService.getStudentInformation().subscribe((data) => {
      this.loaderService.display(false);
      if (data.code == '200') {
      
        if (data.data.length > 0) {
          if (data.data[0].languages != undefined) {
            for (let i = 0; i < data.data[0].languages.length; i++) {
              var value = {
                value: data.data[0].languages[i]
              }
              this.languagesYouSpeakSelection.push(value);
              this.noLanguageSelction = false;
            }
          }
          
          if (data.data[0].counrty != undefined) {
            this.country = data.data[0].counrty;
          }
          else{
           // this was for auto timezone
            this.country=this.currentTimeZone;
            if(this.country!=undefined){
              let timezone = this.countries.filter(x => x.name == this.country);
             //let timezone = this.countries.filter(x => x.name =='dt');
             
              if(timezone!=undefined){

              }
            }
              //
              // this.timeZone = timezone[0].offsetStr;
          }

          if (data.data[0].timeZone != undefined) {
            this.timeZone = data.data[0].timeZone;
          }
          else{
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
      } else {
        this.loaderService.display(false);
      //  this.router.navigate(['']);
      }
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
        this.noLanguageSelction = false;
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

    }
    this.selecteLanguages = '0';
   // this.getLanguagesYouSpeak();
    $event.source.value ='0';

  }

  removeLanguageFromList(index) {
    this.noMoreThanFive = false;
    this.selecteLanguages = '0';
    this.languagesYouSpeakSelection.splice(index, 1);
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noLanguageSelction = false;
    } else {
      this.noLanguageSelction = true;
    }
  }


  getLanguagesYouSpeak() {
    this.studentService.getStudentLanguages().subscribe((data) => {

      if (data.code == '200') {
        this.languagesYouSpeak = data.data;
      } else {
      }
    }, error => {
      console.log(error.code)

    });
  }


  gotoSecondStep() {
    this.router.navigate(['../../student/profile'])
  }


  //get countries and their timezone
  getCountriesAndTimeZone() {
    
    this.studentService.getCountriesAndTimeZone().subscribe((data) => {
      if (data.code == '200') {
        
        this.countries = data.data;
        if(data.ipInfo!=undefined && data.ipInfo.timezone!=undefined && data.ipInfo.timezone!=''){
          
          this.currentTimeZone = data.ipInfo.timezone;
          this.currentCountry =data.ipInfo.countryCode;

            // this.country=data.ipInfo.timezone;
            //  let timezone = this.countries.filter(x => x.name == this.country);
            //  this.timeZone = timezone[0].offsetStr;
     
             }
      } else {
        
       // this.router.navigate(['']);
      }
    }, error => {
      
      console.log(error.code)
    });
  }


  goToThiredStep() {
    this.validate();
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noLanguageSelction = false;

      

      if(this.countryName!=0){
      if (this.country != '0') {
        if (this.timeZone != '' && this.timeZone != '0') {
          this.loaderService.display(true);
          this.noTimeZone = false;
          var languages = [];
          for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
            languages.push(this.languagesYouSpeakSelection[i].value)
          }
          var timeZone = this.timeZone;
          var obj = {
            language: languages,
            counrty: this.country,
            timeZone: this.timeZone,
            countryName:this.countryName
          }
          
          this.studentService.saveStudentSecondStepData(obj).subscribe((data) => {
            if (data.code == '200') {
              this.loaderService.display(false);
              this.router.navigate(['../../student/student-profile-third-step'])
            } else {
              this.router.navigate(['']);
            }
          }, error => {

            console.log(error.code)

          });
        } else {
          this.noTimeZone = true;
        }
      }
      
      else {
        this.noCountrySelected = true;
      }
    }else{
     this.noCountryNameSelected=true;
    }
    } else {
      this.noLanguageSelction = true;
      
    }
  }

  validate() {
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noLanguageSelction = false;
    }
    else {
      this.noLanguageSelction = true;
    }

    if (this.country != '0') {
      this.noCountrySelected = false;
    }
    else {
      this.noCountrySelected = true;
    }
    if (this.timeZone != '') {
      this.noTimeZone = false;
    } else {
      this.noTimeZone = true;
    }
  }
  changeCountry() {
    this.noMoreThanFive = false;
    let timezone = this.countries.filter(x => x.name == this.country);
    this.timeZone = timezone[0].offsetStr;
    this.noCountrySelected = false;
  }
}
