import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TeacherService } from '../../../../../../../services/teacher.service';
import { LoaderService } from '../../../../../../shared/loader';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit {


  languagesYouSpeakAndTeach: any[] = [];
  speakLanguage: string = '0';
  teachLanguage: string = '0';

  noTachLanguageSelction: boolean = false;
  noSpeakLanguageSelction: boolean = false;

  validationStatus: string = '';

  languagesYouSpeakSelection: any = [];

  noMoreThanFive: boolean = false;
  responseMessage: string = '';


  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService) { }

  ngOnInit() {

    this.loaderService.display(true);
    this.getLanguagesYouSpeakAndTeach();
    var teacherDetails = localStorage.getItem('teacher-full-details') || null;
    
    if (teacherDetails != null) {
      var techerInfo = JSON.parse(teacherDetails);
      this.getTeacherInformation(techerInfo);
    }



  }




  //fetching teacher information method
  getTeacherInformation(teacherInfo) {

    if (teacherInfo.teachLanguage != undefined && teacherInfo.teachLanguage != null) {
      this.teachLanguage = teacherInfo.teachLanguage;
    }
    if (teacherInfo.speakLanguage != undefined && teacherInfo.speakLanguage != null) {
      var languages = teacherInfo.speakLanguage;
      var language = languages.split(',');
      for (var i = 0; i < language.length; i++) {
        var value = {
          value: language[i]
        }
        this.languagesYouSpeakSelection.push(value);
      }
      this.speakLanguage = '0';
    }

    this.loaderService.display(false);

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
  invalid(): boolean {

    if (this.languagesYouSpeakSelection.length > 0 && this.teachLanguage) {
      return false;
    }
    return true;
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
    this.speakLanguage = '0';
    $event.source.value = '0';
  }


  editLanguges() {
    if (this.languagesYouSpeakSelection.length > 0) {
      if (this.teachLanguage != '0') {
        this.loaderService.display(true);
        var languages = [];
        for (let i = 0; i < this.languagesYouSpeakSelection.length; i++) {
          languages.push(this.languagesYouSpeakSelection[i].value)
        }
        let body = new URLSearchParams();
        body.set('speakLanguage', languages.toString());
        body.set('teachLanguage', this.teachLanguage);
        this.teacherService.reSetupTutorProfile(body).subscribe((data) => {
          this.loaderService.display(false);
          
          if (data.code == '200') {
            this.responseMessage = "Request has been sent to admin for approvel .";
          } else {
            this.responseMessage = "There is some internal error";
          }
        }, error => {
          console.log(error.code);
        });
      }
    }
  }



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

}
