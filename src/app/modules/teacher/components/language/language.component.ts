import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service'

import { HeaderService } from '../../../../header.service';

import { LoaderService } from '../../../shared/loader'
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  providers: [TeacherService]
})
export class LanguageComponent implements OnInit {
  languagesYouSpeakAndTeach: any[] = [];
  speakLanguage: string = '0';
  teachLanguage: string = '0';
  varificationId: string;
  noTachLanguageSelction: boolean = false;
  noSpeakLanguageSelction: boolean = false;

  allIntrest: any[] = [];
  allInrestInner: any[] = [];
  allSelectedintrestInner: any[] = [];
  intrestName: string;
  purpose: string;
  //intrest: string;
  intrest: any[] = [];
  validationStatus: string = '';

  languagesYouSpeakSelection: any = [];

  noMoreThanFive: boolean = false;

  intrestCheck:string='1';


  ifNointerests:boolean=false;
  ifMoreThanFive:boolean=false;

  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setHeaderValue(true);

    this.intrestName = 'FREE TALKING';
    this.loaderService.display(true);
    this.purpose = '1';
    //this.intrest = 'Free talking';
    this.getTeacherIntrest();
    this.getLanguagesYouSpeakAndTeach();

    if (localStorage.getItem('auth-token') != undefined) {
      this.varificationId = localStorage.getItem('auth-token');
    }
    this.getTeacherInformation();
  }


  //active menu of interst
  checkForIntrest(existvalue) {
    let exist = this.intrest.filter(x => x == existvalue);
    if (exist.length > 0) {
      return true;
    }
    return false;
  }

  //fetching teacher information method
  getTeacherInformation() {
    this.teacherService.getTeacherInformation().subscribe((data) => {
      if (data.code == '200') {
        if (data.tutorsInfo.length > 0) {
          if (data.tutorsInfo[0].teachLanguage != undefined) {
            this.teachLanguage = data.tutorsInfo[0].teachLanguage;
          }
          if (data.tutorsInfo[0].parantInterest != undefined) {
            this.intrest = [];
            for (let i = 0; i < data.tutorsInfo[0].parantInterest.length; i++) {
              this.intrest.push(data.tutorsInfo[0].parantInterest[i]);
            };
          }

          if (data.tutorsInfo[0].interests != undefined) {
            this.allSelectedintrestInner = [];
            for (let i = 0; i < data.tutorsInfo[0].interests.length; i++) {
              this.allSelectedintrestInner.push(data.tutorsInfo[0].interests[i]);
            };
          }



          if (data.tutorsInfo[0].speakLanguage != undefined && data.tutorsInfo[0].speakLanguage != null) {
           var languages =data.tutorsInfo[0].speakLanguage;
           var language = languages.split(',');
           for(var i=0;i<language.length;i++){
            var value = {
              value: language[i]
            }
            this.languagesYouSpeakSelection.push(value);
           }
           this.speakLanguage = '0';
          }

          this.loaderService.display(false);


        }
      } else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  };




  //remove parent and child element
  removeAllPerentChild(_id) {
    var indexOfArray = this.intrest.indexOf(_id);
    this.intrest.splice(indexOfArray, 1);
    var parentElement = this.allIntrest.filter(x => x._id == _id);
    for (var t = 0; t < parentElement[0].innerData.length; t++) {
      for (var s = 0; s < this.allSelectedintrestInner.length; s++) {
        var currentValue = this.allSelectedintrestInner[s];
        if (currentValue == parentElement[0].innerData[t]._id) {
          var index = this.allSelectedintrestInner.indexOf(currentValue);
          this.allSelectedintrestInner.splice(index, 1);
        }
      }
    }

  }



  ChangePurpose(purpose) {
    this.purpose = purpose;
  }

  isCheckedOrNot(value) {
    if (this.allSelectedintrestInner.length > 0) {        
      var status = false;
      for (let i = 0; i < this.allSelectedintrestInner.length; i++) {
        if (this.allSelectedintrestInner[i] == value) {
          status = false;
          break;
        }
        else {
          status = true;
        }
      }
      if (status) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }


  //Add and remove intreset inner selection
  addRemoveSelection(value,event) {
    
    this.validationStatus = '';
  
    if (this.allSelectedintrestInner.length > 0) {
      // if(this.allSelectedintrestInner.length <= 4){
      var status = false;
      for (let i = 0; i < this.allSelectedintrestInner.length; i++) {
        if (this.allSelectedintrestInner[i] == value) {
          var selection = this.allSelectedintrestInner.filter(x => x == value);
          status = false;
          break;
        }
        else {
          status = true;
        }
      }
      if (status) {

        this.allSelectedintrestInner.push(value);
        var parentId = this.allIntrest.filter(x => (x.innerData.filter(y => y._id == value))[0])[0]._id;
        let existValue = this.intrest.filter(x => x == parentId);

        if (existValue.length == 0) {
          this.intrest.push(parentId);
        }
      }
      else {

        var count = 0;

        var indexOfArray = this.allSelectedintrestInner.indexOf(selection[0]);
        this.allSelectedintrestInner.splice(indexOfArray, 1);

        //find parentId
        var parentId = this.allIntrest.filter(x => (x.innerData.filter(y => y._id == selection[0]))[0])[0]._id;
        var parentElement = this.allIntrest.filter(x => x._id == parentId);


        for (var s = 0; s < this.allSelectedintrestInner.length; s++) {
          var currentValue = this.allSelectedintrestInner[s];
          for (var t = 0; t < parentElement[0].innerData.length; t++) {
            if (currentValue == parentElement[0].innerData[t]._id) {
              count++;
            }
          }
        }


        if (count <= 0) {

          var indexOfArray = this.intrest.indexOf(parentId);
          this.intrest.splice(indexOfArray, 1);
        }

      }

    // }
    // else{
    //   this.validationStatus = 'You can select max 5 Interest';
    //   setTimeout(() => {
    //     this.validationStatus = '';
    //   }, 5000);
    // }


    }
    else {

      this.allSelectedintrestInner.push(value);

      var parentId = this.allIntrest.filter(x => (x.innerData.filter(y => y._id == value))[0])[0]._id;
      let isExistsOrNot = this.intrest.filter(x => x == parentId);
      if (isExistsOrNot.length == 0) {
        this.intrest.push(parentId);
      }
    }
  }

  changeIntrest(intrest, purpose) {


    this.intrestCheck=intrest;
    if (purpose == 'change') {

      this.validationStatus = '';
      let exist = this.intrest.filter(x => x == intrest);
      if (exist.length > 0) {


        //removing the child selection 
        let inner = this.allIntrest.filter(x => x._id == intrest);
        var innerData = inner[0].innerData;
        this.intrestName = inner[0].name;
        this.allInrestInner = innerData;

      }
      else {
        let inner = this.allIntrest.filter(x => x._id == intrest);
        this.intrestName = inner[0].name;
        this.allInrestInner = inner[0].innerData;
      }
    }
    else {

      var indexOfArray = this.intrest.findIndex(x => x == intrest);
      this.intrest.splice(indexOfArray, 1);
      var parentElement = this.allIntrest.filter(x => x._id == intrest);
      for (var t = 0; t < parentElement[0].innerData.length; t++) {
        for (var s = 0; s < this.allSelectedintrestInner.length; s++) {
          var currentValue = this.allSelectedintrestInner[s];
          if (currentValue == parentElement[0].innerData[t]._id) {
            var index = this.allSelectedintrestInner.indexOf(currentValue);
            this.allSelectedintrestInner.splice(index, 1);
          }
        }
      }
    }
  }
  getTeacherIntrest() {
    this.teacherService.getTeacherIntrest().subscribe((data) => {
      if (data.code === 200) {
        if (data.dataGrid.length > 0) {
          
          this.allIntrest = data.dataGrid;
          let inner = this.allIntrest;//.filter(x => x._id == this.intrest);
          // this.intrestName = inner[0].name;
          this.allInrestInner = inner[0].innerData;
        }
      } else {
      }
    }, error => {
      console.log(error.code)

    });
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
  isValid() {
    
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noSpeakLanguageSelction = false;
    } else {
      this.noSpeakLanguageSelction = true;
    }
    if (this.teachLanguage != '0') {
      this.noTachLanguageSelction = false;
    } else {
      this.noTachLanguageSelction = true;
    }
  }

  changeLanguageYouTeach() {
    this.noTachLanguageSelction = false;
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
   this.speakLanguage='0';
    $event.source.value ='0';
  }


  goToThirdStep() {
    
    this.isValid();
    if (this.languagesYouSpeakSelection.length>0) {
      if (this.teachLanguage != '0') {
        if (this.allSelectedintrestInner.length > 0) {
          if(this.allSelectedintrestInner.length<=5){
          this.loaderService.display(true);
          var languages = [];
          for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
            languages.push(this.languagesYouSpeakSelection[i].value)
          }

          var obj = {
            parantInterest: this.intrest,
            intrest: this.allSelectedintrestInner,
            //languageYouSpeak: this.speakLanguage,
            languageYouSpeak:languages,
            languageYouTeach: this.teachLanguage
          }

          
          this.teacherService.saveTeacherSecondStepData(obj).subscribe((data) => {
            this.loaderService.display(false);
            if (data.code == '200') {
              this.router.navigate(['../../teacher/education']);
            } else {
              this.router.navigate(['']);
            }
          }, error => {
            console.log(error.code)

          });
        }
        else{

          this.ifNointerests=false;
          this.ifMoreThanFive=true;
          this.validationStatus = 'You can select maximum upto 5 interest';
          setTimeout(() => {
            this.validationStatus = '';
          }, 5000);
        }
      }
        else {
          this.ifNointerests=true;
          this.ifMoreThanFive=false;
          this.loaderService.display(false);
          this.validationStatus = 'Please check at least 1 interest';
          setTimeout(() => {
            this.validationStatus = '';
          }, 5000);
        }
      }
      else{
        window.scrollTo(0, 0);
      }
    }
    else{
      window.scrollTo(0, 0);
    }
  }


  
  removeLanguageFromList(index) {
    this.noMoreThanFive=false;
    this.speakLanguage = '0';
    this.languagesYouSpeakSelection.splice(index, 1);
    if (this.languagesYouSpeakSelection.length > 0) {
      this.noSpeakLanguageSelction = false;
    } else {
      this.noSpeakLanguageSelction = true;
    }
  }

}
