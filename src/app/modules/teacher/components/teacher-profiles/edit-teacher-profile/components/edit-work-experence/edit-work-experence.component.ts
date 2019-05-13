import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../../../../modules/shared/loader'
import { TeacherService } from '../../../../../../../services/teacher.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-edit-work-experence',
  templateUrl: './edit-work-experence.component.html',
  styleUrls: ['./edit-work-experence.component.css']
})
export class EditWorkExperenceComponent implements OnInit {

  

  //for preparing form in the html
  educationListPrepareForm: any[] = [];
  responseMessage:string='';
  
    returnStartYearList: any[] = [];
  
    constructor(private teacherService: TeacherService,
      private route: ActivatedRoute,
      private router: Router,
      private loaderService: LoaderService) { }
  
    ngOnInit() {
      this.loaderService.display(true);
      this.prepareFormInDom();
      // this.getEducationList();

      var teacherDetails = localStorage.getItem('teacher-full-details') || null;
      
      if (teacherDetails != null) {
        var techerInfo = JSON.parse(teacherDetails);
        this.getTeacherInformation(techerInfo);
      }
  
    }
    prepareFormInDom() {
      var form = {
        companyName: '',
        companyNameValid: false,
        position: '',
        positionValid: false,
        location: '',
        locationValid: false,
        stratDateYear: '0',
        stratDateYearValid: false,
        stratDateMonth: '0',
        startDateMonthList:this.getStartMonth(),
        stratDateMonthValid: false,
        endDateYear: '0',
        endDateYearValid: false,
        endDateMonth: '0',
        acquisitionMonthList:this.getStartMonth(),
        endDateMonthValid: false,
        descriptions: '',
        descriptionsValid: false,
        descriptionLength:200,
        startYearList: this.getStartYear(),
        YearofAcquisitionList: this.getStartYear()
      }
      this.educationListPrepareForm.push(form);
    
    }
  
    getStartMonth(): any[] {
      var month = [];
      var obj1={id:1,value:'January'}
      month.push(obj1);
      var obj2={id:2,value:'February'}
      month.push(obj2);
      var obj3={id:3,value:'March'}
      month.push(obj3);
      var obj4={id:4,value:'April'}
      month.push(obj4);
      var obj5={id:5,value:'May'}
      month.push(obj5);
      var obj6={id:6,value:'June'}
      month.push(obj6);
      var obj7={id:7,value:'July'}
      month.push(obj7);
      var obj8={id:8,value:'August'}
      month.push(obj8);
      var obj9={id:9,value:'September'}
      month.push(obj9);
      var obj10={id:10,value:'October'}
      month.push(obj10);
      var obj11={id:11,value:'November'}
      month.push(obj11);
      var obj12={id:12,value:'December'}
      month.push(obj12);
      return month;
    }
    ChangeStartMonth(index, month){
       this.educationListPrepareForm[index].acquisitionMonthList = [];
          // this.educationListPrepareForm[index].acquisitionYear = '0';
          this.educationListPrepareForm[index].acquisitionMonth='0';
          this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >=month);
        }
  
    ChangeStartDate(index, year) {
      this.educationListPrepareForm[index].YearofAcquisitionList = [];
      this.educationListPrepareForm[index].endDateYear = '0';
      this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);
    }
  
    changeTextAreacount(value, index) {
      this.educationListPrepareForm[index].descriptionLength = 200-value.length;
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      // this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);
    }
  
    addNewForm() {
      if (this.educationListPrepareForm.length <= 4) {
        var form = {
          companyName: '',
          companyNameValid: false,
          position: '',
          positionValid: false,
          location:'',
          locationValid: false,
          stratDateYear: '0',
          stratDateYearValid: false,
          stratDateMonth: '0',
          startDateMonthList:this.getStartMonth(),
          stratDateMonthValid: false,
          endDateYear: '0',
          endDateYearValid: false,
          endDateMonth: '0',
          acquisitionMonthList:this.getStartMonth(),
          endDateMonthValid: false,
          descriptions: '',
          descriptionsValid: false,
          descriptionLength:200,
          startYearList: this.getStartYear(),
          YearofAcquisitionList: this.getStartYear()
        }
        this.educationListPrepareForm.push(form);
      }
    }
  
  
    removeFormFromDome(index) {
      this.educationListPrepareForm.splice(index, 1);
    }
  
  
  
  
  
    showValidation() {
      for (let i = 0; i < this.educationListPrepareForm.length; i++) {
        
  
        if (this.educationListPrepareForm[i].companyName != '0' && this.educationListPrepareForm[i].companyName != '') {
          this.educationListPrepareForm[i].companyNameValid = false;
        }
        else {
          this.educationListPrepareForm[i].companyNameValid = true;
        }
  
        if (this.educationListPrepareForm[i].position != '0' && this.educationListPrepareForm[i].position != '') {
          this.educationListPrepareForm[i].positionValid = false;
        }
        else {
          this.educationListPrepareForm[i].positionValid = true;
        }
        
        if (this.educationListPrepareForm[i].location != '' && this.educationListPrepareForm[i].location != undefined) {
          this.educationListPrepareForm[i].locationValid = false;
        }
        else {
          this.educationListPrepareForm[i].locationValid = true;
        }
  
  
        if (this.educationListPrepareForm[i].stratDateYear != '0' && this.educationListPrepareForm[i].stratDateYear != '') {
          this.educationListPrepareForm[i].stratDateYearValid = false;
        }
        else {
          this.educationListPrepareForm[i].stratDateYearValid = true;
        }
  
  
        if (this.educationListPrepareForm[i].stratDateMonth != '0' && this.educationListPrepareForm[i].stratDateMonth != '') {
          this.educationListPrepareForm[i].stratDateMonthValid = false;
        }
        else {
          this.educationListPrepareForm[i].stratDateMonthValid = true;
        }
  
        if (this.educationListPrepareForm[i].endDateYear != '0' && this.educationListPrepareForm[i].endDateYear != '') {
          this.educationListPrepareForm[i].endDateYearValid = false;
        }
        else {
          this.educationListPrepareForm[i].endDateYearValid = true;
        }
  
        if (this.educationListPrepareForm[i].endDateMonth != '0' && this.educationListPrepareForm[i].endDateMonth != '') {
          this.educationListPrepareForm[i].endDateMonthValid = false;
        }
        else {
          this.educationListPrepareForm[i].endDateMonthValid = true;
        }
  
        if (this.educationListPrepareForm[i].descriptions != '0' && this.educationListPrepareForm[i].descriptions != '') {
          this.educationListPrepareForm[i].descriptionsValid = false;
        }
        else {
          this.educationListPrepareForm[i].descriptionsValid = true;
        }
        
      }
    }
  
    isValid(): boolean {
      let status = true;
      for (let i = 0; i < this.educationListPrepareForm.length; i++) {
  
        
        if (this.educationListPrepareForm[i].companyName == '0' || this.educationListPrepareForm[i].companyName == '') {
          return false;
        }
  
  
        if (this.educationListPrepareForm[i].position == '0' || this.educationListPrepareForm[i].position == '') {
          return false;
        }
        
        if (this.educationListPrepareForm[i].location == '' || this.educationListPrepareForm[i].location == undefined) {
          return false;
        }
  
  
  
        if (this.educationListPrepareForm[i].stratDateYear  == '0' || this.educationListPrepareForm[i].stratDateYear  == '') {
          return false;
        }
  
  
        if (this.educationListPrepareForm[i].stratDateMonth == '0' || this.educationListPrepareForm[i].stratDateMonth == '') {
          return false;
        }
  
  
        if (this.educationListPrepareForm[i].endDateYear == '0' || this.educationListPrepareForm[i].endDateYear == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].endDateMonth == '0' || this.educationListPrepareForm[i].endDateMonth == '') {
          return false;
        }
  
  
        if (this.educationListPrepareForm[i].descriptions == '0' || this.educationListPrepareForm[i].descriptions == '') {
          return false;
        }
      }
      return status;
    }
  
    gotoPreviouseStep(){
      this.router.navigate(['../../teacher/certification']);
    }
    

  
    setMonth(index, month,){
      if(this.educationListPrepareForm[index].stratDateYear == this.educationListPrepareForm[index].endDateYear){
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].endDateMonth='0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >=month);
      }
      else{
        this.educationListPrepareForm[index].acquisitionMonthList = [];
        // this.educationListPrepareForm[index].acquisitionYear = '0';
        this.educationListPrepareForm[index].endDateMonth='0';
        this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList;//.filter(x => x.id >=month);
      }
    }
  
  
  
    skipStep()
    {
      this.router.navigate(['../../teacher/introduction']);
    }
  
  //fetching teacher information method
  getTeacherInformation(teacherInfo) {
    

          if (teacherInfo.workExperience != undefined && teacherInfo.workExperience.length > 0) {
            this.educationListPrepareForm = [];
             for (let i = 0; i < teacherInfo.workExperience.length; i++) {
               
              var allMonth=this.getStartMonth();
              var allYear=this.getStartYear();
              var start=teacherInfo.workExperience[i].startDate.split('-')[0];
              var end =teacherInfo.workExperience[i].endDate.split('-')[0];
              var YearofAcquisitionList =allYear.filter(x=> x>=teacherInfo.workExperience[i].startDate.split('-')[0]);
             
              if(start==end){                  
               var acquisitionMonthList=allMonth.filter(x=>x.id>=teacherInfo.workExperience[i].startDate.split('-')[1]);                
              }
              else{
              var acquisitionMonthList=allMonth;
              }    
  
              var form = {
                companyName: teacherInfo.workExperience[i].companyName,
                companyNameValid: false,
                position: teacherInfo.workExperience[i].position,
                positionValid: false,
                stratDateYear: teacherInfo.workExperience[i].startDate.split('-')[0],
                stratDateYearValid: false,
                stratDateMonth:teacherInfo.workExperience[i].startDate.split('-')[1],
                stratDateMonthValid: false,
                endDateYear: teacherInfo.workExperience[i].endDate.split('-')[0],
                endDateYearValid: false,
                endDateMonth: teacherInfo.workExperience[i].endDate.split('-')[1],
                endDateMonthValid: false,
                descriptions: teacherInfo.workExperience[i].descriptions,
                descriptionsValid: false,
                descriptionLength:200-teacherInfo.workExperience[i].descriptions.length,
                startYearList: this.getStartYear(),
                YearofAcquisitionList: YearofAcquisitionList,
                startDateMonthList:this.getStartMonth(),
                acquisitionMonthList:acquisitionMonthList,
                location:teacherInfo.workExperience[i].location,
                locationValid:false
              }
              this.educationListPrepareForm.push(form);
            }
  
          }
          this.loaderService.display(false);     
  };
  
  
  
  
  
  
  //giving year 70 year back
    getStartYear(): any[] {
      this.returnStartYearList = [];
      var currentTime = new Date()
      var Currentyear = currentTime.getFullYear()
      let startYear = Currentyear - 70;
      for (let y = startYear; y <= Currentyear; y++) {
        this.returnStartYearList.push(y);
      }
      return this.returnStartYearList;
    }


    editWorkExperiance() {
      this.showValidation();
      if (this.isValid()) {
          this.loaderService.display(true);
         // this.validFileStatus = "";
          var workExperienceData = [];
          for (let i = 0; i < this.educationListPrepareForm.length; i++) {
            var obj = {
              "companyName": this.educationListPrepareForm[i].companyName,
              "position": this.educationListPrepareForm[i].position,
              "startDate": this.educationListPrepareForm[i].stratDateYear + '-' + this.educationListPrepareForm[i].stratDateMonth + '-01',
              "endDate": this.educationListPrepareForm[i].endDateYear + '-' + this.educationListPrepareForm[i].endDateMonth + '-01',
              "descriptions": this.educationListPrepareForm[i].descriptions,
              "location": this.educationListPrepareForm[i].location
            }
            workExperienceData.push(obj);
  
          }
          let body = new URLSearchParams();
          body.set('workExperienceData', JSON.stringify(workExperienceData));
          console.log(workExperienceData);
      
          this.teacherService.reSetupTutorProfile(body).subscribe((data) => {
            
            if (data.code == '200') {
              this.responseMessage = "Request has been sent to admin for approval .";
            } else {
              this.responseMessage = "There is some internal error";
            }
            this.loaderService.display(false);  
  
          }, error => {
            
            this.loaderService.display(false);
            
            //this.router.navigate(['']);
          });
      }
      else{
        window.scrollTo(0, 0);
      }
    }

}
