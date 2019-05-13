import { Component, OnInit,Inject, Injectable,ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service'
import { DOCUMENT } from '@angular/platform-browser';
import {LoaderService} from '../../../../modules/shared/loader'

import { HeaderService } from '../../../../header.service';

@Component({
  selector: 'app-student-profile-third',
  templateUrl: './student-profile-third.component.html',
  styleUrls: ['./student-profile-third.component.css'],
  providers:[StudentService]
})
export class StudentProfileThirdComponent implements OnInit {

  progressBarValue: string;
  languageYouAreLeaning: any[] = [];
  speakingLanguage: string;
  dynamicStyle: string;
  noLanguageSelction:boolean=false;
  sliderValue:number=0;


  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef,
  private route: ActivatedRoute, 
  private router: Router,  
  private studentService: StudentService,
  private loaderService:LoaderService,
  private headerService:HeaderService
) { }


  ngOnInit() {

    this.headerService.setHeaderValue(true);

    this.loaderService.display(true);
    
    this.progressBarValue = '1';
    this.getLanguageYouAreLearning();
    this.speakingLanguage = '0';
    this.dynamicStyle = '0px';
    this.sliderValue=0;
    this.getStudentInformation();
  }



  //get student full information
  getStudentInformation() {
    this.studentService.getStudentInformation().subscribe((data) => {
      
      if (data.code == '200') {
        if (data.data.length > 0) {
         // if(data.data[0].profileStepThree){
           
         
      
          if (data.data[0].mainlanguage != undefined) {
            this.speakingLanguage = data.data[0].mainlanguage;
          }

          if (data.data[0].rate != undefined) {
            this.progressBarValue = data.data[0].rate;
            this.ChangeValue(this.progressBarValue);
          }
          this.loaderService.display(false);
        // }
        // else{
        //   this.router.navigate(['']);
        //  // this.router.navigate(['../../student/student-profile-second-step'])
        // }

        }
      } else {
        this.router.navigate(['']);
      }
    }, error => {

      //   if (error.code == 501) {
      this.router.navigate(['']);
      // }
    });
  };





  goToSecondStep(){
    this.router.navigate(['../../student/student-profile-second-step'])
  }

  changeSliderValue(event){
    

//this.loaderService.display(true);
    let value=event.value;
    if(this.sliderValue<=16.16){
      alert('value<=16.16');
      this.progressBarValue = '1';
      this.sliderValue=0;
      event.value=0;
    }
    else if (this.sliderValue>16.16 && value<=33.33){
      alert('value>16.16 && value<=33.33');
      this.progressBarValue = '2';
     this.sliderValue=21;
     event.value=21;
    }
    else if (this.sliderValue>33.33 && value<=50.00){
     alert('value>33.33 && value<=50.00');
      this.progressBarValue = '3';
     this.sliderValue=41;
     event.value=41;
    }
    else if (this.sliderValue>50.00 && value<=66.66){
      alert('value>50.00 && value<=66.66');
      this.progressBarValue = '4';
      this.sliderValue=61;
     event.value=61;
    }
    else if (this.sliderValue>66.66 && value<=83.33){
      alert('value>66.66 && value<=83.33');
      this.progressBarValue = '5';
     this.sliderValue=80;
     event.value=80;
    }
    else{
      alert('100');
      this.progressBarValue = '6';
     this.sliderValue=100;
     event.value=100;
    }
    this.loaderService.display(false);
  }
  getLanguageYouAreLearning() {
      this.studentService.getStudentLanguages().subscribe((data) => {
      if (data.code == '200') {
          this.languageYouAreLeaning=data.data;
        } else {
         this.router.navigate(['']);
        }
      }, error => {
        console.log(error.code);
        this.router.navigate(['']);
      });

  }

 
  ChangeValue(value) {

    this.loaderService.display(true);
    if (value == '1') {
      this.dynamicStyle = '0px';
      this.sliderValue=0;
    }
    else if (value == '2') {
      this.dynamicStyle = '106px';
      this.sliderValue=21;
    }
    else if (value == '3') {
      this.dynamicStyle = '215px';
      this.sliderValue=41;
    }
    else if (value == '4') {
      this.dynamicStyle = '323px';
      this.sliderValue=61;
    }

    else if (value == '5') {
      this.dynamicStyle = '431px';
      this.sliderValue=81;
    }
    else if (value == '6') {
      this.dynamicStyle = '541px';
      this.sliderValue=100;
    }
    this.progressBarValue = value;
    this.loaderService.display(false);
  }
  goToFourthStep() {

    let value=this.sliderValue;
    if(this.sliderValue<=16.16){
      this.progressBarValue = '1';
    }
    else if (this.sliderValue>16.16 && value<=33.33){
      this.progressBarValue = '2';
    }
    else if (this.sliderValue>33.33 && value<=50.00){
      this.progressBarValue = '3';
    }
    else if (this.sliderValue>50.00 && value<=66.66){
      this.progressBarValue = '4';
    }
    else if (this.sliderValue>66.66 && value<=83.33){
      this.progressBarValue = '5';
    }
    else{
      this.progressBarValue = '6';
    }
    if (this.speakingLanguage !== '0') {
      
      var obj={
        mainlanguage:this.speakingLanguage,
        rate:this.progressBarValue
      }
      this.noLanguageSelction=false;
      this.studentService.saveStudentThirdStepData(obj).subscribe((data) => {
        if (data.code == '200') {
              this.router.navigate(['../../student/student-profile-fourth-step'])
        } else {
          this.router.navigate(['']);
        }
      }, error => {
        
        console.log(error.code)

      });


    }
    else {
      this.noLanguageSelction=true;
    }
  }

  ChangeLanguage() {
    this.noLanguageSelction=false;
  }

 

}
