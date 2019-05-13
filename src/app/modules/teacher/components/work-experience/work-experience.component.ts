import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'

import { HeaderService } from '../../../../header.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css'],
  providers:[TeacherService]
})
export class WorkExperienceComponent implements OnInit {


  //for preparing form in the html
  educationListPrepareForm: any[] = [];

  returnStartYearList: any[] = [];

  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private headerService :HeaderService) { }

  ngOnInit() {
    this.headerService.setHeaderValue(true);
    this.loaderService.display(true);
    this.prepareFormInDom();
    // this.getEducationList();
    this.getTeacherInformation();

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
  
  gotoNextStep() {
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
        this.teacherService.saveTeacherworkExperianceData(workExperienceData).subscribe((data) => {
          if (data.code == '200') {
            this.loaderService.display(false);
            this.router.navigate(['../../teacher/introduction']);
          }
          else {

            //this.router.navigate(['']);
          }


        }, error => {
          //this.router.navigate(['']);
        });
    }
    else{
      window.scrollTo(0, 0);
    }
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
getTeacherInformation() {
  this.teacherService.getTeacherInformation().subscribe((data) => {
    if (data.code == '200') {
      if (data.tutorsInfo.length > 0) {
        if (data.tutorsInfo[0].workExperience != undefined && data.tutorsInfo[0].workExperience.length > 0) {
          this.educationListPrepareForm = [];
           for (let i = 0; i < data.tutorsInfo[0].workExperience.length; i++) {
             
            var allMonth=this.getStartMonth();
            var allYear=this.getStartYear();
            var start=data.tutorsInfo[0].workExperience[i].startDate.split('-')[0];
            var end =data.tutorsInfo[0].workExperience[i].endDate.split('-')[0];
            var YearofAcquisitionList =allYear.filter(x=> x>=data.tutorsInfo[0].workExperience[i].startDate.split('-')[0]);
           
            if(start==end){                  
             var acquisitionMonthList=allMonth.filter(x=>x.id>=data.tutorsInfo[0].workExperience[i].startDate.split('-')[1]);                
            }
            else{
            var acquisitionMonthList=allMonth;
            }    

            var form = {
              companyName: data.tutorsInfo[0].workExperience[i].companyName,
              companyNameValid: false,
              position: data.tutorsInfo[0].workExperience[i].position,
              positionValid: false,
              stratDateYear: data.tutorsInfo[0].workExperience[i].startDate.split('-')[0],
              stratDateYearValid: false,
              stratDateMonth:data.tutorsInfo[0].workExperience[i].startDate.split('-')[1],
              stratDateMonthValid: false,
              endDateYear: data.tutorsInfo[0].workExperience[i].endDate.split('-')[0],
              endDateYearValid: false,
              endDateMonth: data.tutorsInfo[0].workExperience[i].endDate.split('-')[1],
              endDateMonthValid: false,
              descriptions: data.tutorsInfo[0].workExperience[i].descriptions,
              descriptionsValid: false,
              descriptionLength:200-data.tutorsInfo[0].workExperience[i].descriptions.length,
              startYearList: this.getStartYear(),
              YearofAcquisitionList: YearofAcquisitionList,
              startDateMonthList:this.getStartMonth(),
              acquisitionMonthList:acquisitionMonthList,
              location:data.tutorsInfo[0].workExperience[i].location,
              locationValid:false
            }
            this.educationListPrepareForm.push(form);
          }

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

}
