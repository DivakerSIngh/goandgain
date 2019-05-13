import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'

import { HeaderService } from '../../../../header.service';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  providers:[TeacherService]
})
export class CertificationComponent implements OnInit {

  formData: any;
  returnStartYearList: any[] = [];

    //for preparing form in the html
    educationListPrepareForm: any[] = [];

    experienceList: any[] = [];
    startYearList: any[] = [];
    YearofAcquisitionList: any[] = [];
  
    uploadValue: any[] = [];
    formStatus:string='';
  
  
    validFileStatus: string;
  
  
  //For Multi Language 

  ifInvalid:boolean=false;
  ifSizeExceed:boolean=false;
  ifInternalErro:boolean=false;
  ifMoreThanFive:boolean=false;

  
    constructor(private teacherService: TeacherService,
      private route: ActivatedRoute,
      private router: Router,
      private loaderService: LoaderService,
      private headerService:HeaderService
    ) { }
  
    ngOnInit() {

      this.headerService.setHeaderValue(true);
      this.loaderService.display(true);
      this.formData = new FormData();
      this.prepareFormInDom();
      this.getEducationList();
      this.getTeacherInformation();
      //this.getYear();
    }
  
    prepareFormInDom() {
      var form = {
        experience: '',
        experienceValid: false,
        // title: '',
        // titleValid: false,
        institution: '',
        institutionValid: false,
        location: '',
        locationValid: false,
        stratDateYear: '0',
        stratDateYearValid: false,
        stratDateMonth: '0',
        startDateMonthList:this.getStartMonth(),
        stratDateMonthValid: false,
        acquisitionYear: '0',
        acquisitionYearValid: false,
        acquisitionMonth: '0',
        acquisitionMonthList:this.getStartMonth(),
        acquisitionMonthValid: false,
        descriptions: '',
        descriptionsValid: false,
        descriptionLength :200,
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
  

    //setting month for acquisitionYear
    setMonth(index, month, acquisitionYear){
    if(acquisitionYear!='Not expiring'){
      if(this.educationListPrepareForm[index].acquisitionYear == this.educationListPrepareForm[index].stratDateYear){
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].acquisitionMonth='0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >=month);
      }
      else{
        this.educationListPrepareForm[index].acquisitionMonthList = [];
        // this.educationListPrepareForm[index].acquisitionYear = '0';
        this.educationListPrepareForm[index].acquisitionMonth='0';
        this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList;//.filter(x => x.id >=month);
      }
    }else{
      this.educationListPrepareForm[index].acquisitionMonth='Not expiring';
    }
    }

    removeFile(index) {
      this.validFileStatus = '';
      this.uploadValue.splice(index, 1);
    }
  
    //checking the valid document
  isValidFile(ext: string): boolean {
    if (ext != "pdf" && ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "doc" && ext != "docx" && ext != "xlsx" && ext != "xls") {
      return false;
    }
    return true;
  }

    //choose file 
    onFileChange(fileInput) {
      this.validFileStatus='';
      if (this.uploadValue.length <= 4) {
        let fileList: FileList = fileInput.target.files;
        if (fileList.length > 0) {
          this.loaderService.display(true);
          let file: File = fileList[0];
          console.log(fileList, file);
  
          let fileSize: number = fileList[0].size;
          let fileExtenstion = fileList[0].name.split('.').pop();
          if (this.isValidFile(fileExtenstion.toLowerCase())) {
            //1 MB
            if (fileSize <= 1024000) {
  
              this.formData.append('userImage', file);
          //this.formData.set('userImage', file);
          

            //file.name
            localStorage.setItem('fileName', file.name);
            this.teacherService.uploadTeacherProfileImage(this.formData).subscribe((data) => {
              if (data.code == '200') {
                var obj = {
                  fileName: localStorage.getItem('fileName') || null,
                  fileLocation: data.imageURL
                }
                this.uploadValue.push(obj);
                this.validFileStatus = "";
                this.loaderService.display(false);

                this.ifInvalid=false;
                this.ifSizeExceed=false;
                this.ifInternalErro=false;
                this.ifMoreThanFive=false;
                
              }
              else {
                this.ifInvalid=false;
                this.ifSizeExceed=false;
                this.ifInternalErro=true;
                this.ifMoreThanFive=false;
                // this.requiredStatus = 'There is some internal error.';
                // this.isImage = false;
                // this.loaderService.display(false);   
                this.router.navigate(['']);
              }
  
  
            }, error => {
  
              this.ifInvalid=false;
              this.ifSizeExceed=false;
              this.ifInternalErro=true;
              this.ifMoreThanFive=false;
              // validFileStatus
              this.loaderService.display(false);
              console.log(error.code);
              //this.router.navigate(['']);
            });
  
          }
          else {

            this.ifInvalid=false;
            this.ifSizeExceed=true;
            this.ifInternalErro=false;
            this.ifMoreThanFive=false;
            this.loaderService.display(false);
            this.validFileStatus = 'File size can not be more than 1 MB.';
          }
        }
        else{
          this.ifInvalid=true;
          this.ifSizeExceed=false;
          this.ifInternalErro=false;
          this.ifMoreThanFive=false;
          this.loaderService.display(false);
         // this.validFileStatus = 'You can upload only pdf, doc, docx, xlsx, xls, jpg, jpeg, png.';
         this.validFileStatus = 'Please upload a valid file.';
         
        }
        }
  
      }
      else {
        this.ifInvalid=false;
        this.ifSizeExceed=false;
        this.ifInternalErro=false;
        this.ifMoreThanFive=true;
        this.loaderService.display(false);
        this.validFileStatus = "you can upload only 5 valid file.";
      }
  
    }
  
  
  
  
  
  
  
  
  
    ChangeStartMonth(index, month){
      
          this.educationListPrepareForm[index].acquisitionMonthList = [];
          // this.educationListPrepareForm[index].acquisitionYear = '0';
          this.educationListPrepareForm[index].acquisitionMonth='0';
          this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >=month);
        }

  
  
    ChangeStartDate(index, year) {
      this.educationListPrepareForm[index].YearofAcquisitionList = [];
      this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);
    }
  


    changeTextAreacount(value, index) {
      this.educationListPrepareForm[index].descriptionLength = 200-value.length;
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      // this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);
    }
  
    removeFormFromDome(index) {
      this.formStatus='';
      this.educationListPrepareForm.splice(index, 1);
    }
  
    addNewForm() {
      if (this.educationListPrepareForm.length <= 4) {
        this.formStatus='';
        var form = {
          experience: '',
          experienceValid: false,
          // title: '',
          // titleValid: false,
          institution: '',
          institutionValid: false,
          location: '',
          locationValid: false,
          stratDateYear: '0',
          stratDateYearValid: false,
          stratDateMonth: '0',
          startDateMonthList:this.getStartMonth(),
          stratDateMonthValid: false,
          acquisitionYear: '0',
          acquisitionYearValid: false,
          acquisitionMonth: '0',
          acquisitionMonthList:this.getStartMonth(),
          acquisitionMonthValid: false,
          descriptions: '',
          descriptionsValid: false,
          descriptionLength:200,
          startYearList: this.getStartYear(),
          YearofAcquisitionList: this.getStartYear()
        }
        this.educationListPrepareForm.push(form);
      }
      else{
        this.formStatus='You can add only 5 certificates';
      }
    }
  
    getEducationList() {
      this.experienceList.push('Associate Degree');
      this.experienceList.push('Bachelor Degree');
      this.experienceList.push('Graduate Degree');
      this.experienceList.push('Master Degree');
      this.experienceList.push('Doctoral Degree');
      this.experienceList.push('Professional Degree');
    }
  
  
  
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
  
  
    gotoPreviouseStep() {
      this.router.navigate(['../../teacher/education']);
  
    }
  
  
  
  
  
    //here showing the validation error
    showValidation() {
      for (let i = 0; i < this.educationListPrepareForm.length; i++) {
        if (this.educationListPrepareForm[i].experience != '' ) {
          this.educationListPrepareForm[i].experienceValid = false;
        }
        else {
          this.educationListPrepareForm[i].experienceValid = true;
        }
        // if (this.educationListPrepareForm[i].title != '0' && this.educationListPrepareForm[i].title != '') {
        //   this.educationListPrepareForm[i].titleValid = false;
        // }
        // else {
        //   this.educationListPrepareForm[i].titleValid = true;
        // }
  
  
        if (this.educationListPrepareForm[i].institution != '0' && this.educationListPrepareForm[i].institution != '') {
          this.educationListPrepareForm[i].institutionValid = false;
        }
        else {
          this.educationListPrepareForm[i].institutionValid = true;
        }
  
  
        if (this.educationListPrepareForm[i].location != '0' && this.educationListPrepareForm[i].location != '') {
          this.educationListPrepareForm[i].locationValid = false;
        }
        else {
          this.educationListPrepareForm[i].locationValid = true;
        }
  
  
        //not done
  
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
  
  
        if (this.educationListPrepareForm[i].acquisitionYear != '0' && this.educationListPrepareForm[i].acquisitionYear != '') {
          this.educationListPrepareForm[i].acquisitionYearValid = false;
        }
        else {
          this.educationListPrepareForm[i].acquisitionYearValid = true;
        }
  
        if (this.educationListPrepareForm[i].acquisitionMonth != '0' && this.educationListPrepareForm[i].acquisitionMonth != '') {
          this.educationListPrepareForm[i].acquisitionMonthValid = false;
        }
        else {
          this.educationListPrepareForm[i].acquisitionMonthValid = true;
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
        if (this.educationListPrepareForm[i].experience == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].title == '0' || this.educationListPrepareForm[i].title == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].institution == '0' || this.educationListPrepareForm[i].institution == '') {
          return false;
        }
  
  
        if (this.educationListPrepareForm[i].location == '0' || this.educationListPrepareForm[i].location == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].stratDateYear == '0' || this.educationListPrepareForm[i].stratDateYear == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].stratDateMonth == '0' || this.educationListPrepareForm[i].stratDateMonth == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].acquisitionYear == '0' || this.educationListPrepareForm[i].acquisitionYear == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].acquisitionMonth == '0' || this.educationListPrepareForm[i].acquisitionMonth == '') {
          return false;
        }
  
        if (this.educationListPrepareForm[i].descriptions == '0' || this.educationListPrepareForm[i].descriptions == '') {
          return false;
        }
      }
      return status;
    }
  
    gotoNextStep() {
      this.showValidation();
      if (this.isValid()) {
       // if (this.uploadValue.length > 0) {
          this.loaderService.display(true);
          this.validFileStatus = "";
          var experienceData = [];
          for (let i = 0; i < this.educationListPrepareForm.length; i++) {
            var obj = {
              "experienceType": this.educationListPrepareForm[i].experience,
              "title": this.educationListPrepareForm[i].title,
              "institution": this.educationListPrepareForm[i].institution,
              "location": this.educationListPrepareForm[i].location,
              "startDate": this.educationListPrepareForm[i].stratDateYear + '-' + this.educationListPrepareForm[i].stratDateMonth + '-01',
              "yearOfAcquisition": this.educationListPrepareForm[i].acquisitionYear + '-' + this.educationListPrepareForm[i].acquisitionMonth + '-01',
              "descriptions": this.educationListPrepareForm[i].descriptions
            }
            experienceData.push(obj);
  
          }
          var docs = [];
          for (let i = 0; i < this.uploadValue.length; i++) {
            docs.push(this.uploadValue[i].fileLocation)
          }
          this.teacherService.saveTeacherCertificationDetails(experienceData, docs).subscribe((data) => {
            
            if (data.code == '200') {
              this.router.navigate(['../../teacher/work-experience']);
  
            }
            else {
  
              //this.router.navigate(['']);
            }
            this.loaderService.display(false);
  
          }, error => {
            this.loaderService.display(false);
            //this.router.navigate(['']);
          });
  
        // }
        // else {
        //   this.validFileStatus = "Please upload you diploma(s)";
        // }
      }
      else{
        window.scrollTo(0, 0);
      }
    }
  

    skipStep()
    {
         this.router.navigate(['../../teacher/work-experience']);
    }
    //fetching teacher information method
    getTeacherInformation() {
      this.teacherService.getTeacherInformation().subscribe((data) => {
        
        if (data.code == '200') {
          if (data.tutorsInfo.length > 0) {
  
            if (data.tutorsInfo[0].certificationDocs != undefined && data.tutorsInfo[0].certificationDocs.length > 0) {
  
              for (let i = 0; i < data.tutorsInfo[0].certificationDocs.length; i++) {
                var fileName =data.tutorsInfo[0].certificationDocs[i];
                var fileLength =fileName.split('/');
                var NameName =fileLength[fileLength.length-1];
              if(data.tutorsInfo[0].certificationDocs[i].length>0){  var obj = {
                  fileName: NameName,
                  fileLocation: data.tutorsInfo[0].certificationDocs[i]
                }
                this.uploadValue.push(obj);
              }
            }
          }
              if (data.tutorsInfo[0].certification!=undefined && data.tutorsInfo[0].certification.length > 0) {
                
           
                this.educationListPrepareForm = [];
                for (let i = 0; i < data.tutorsInfo[0].certification.length; i++) {
                  var allMonth=this.getStartMonth();
                  var allYear=this.getStartYear();
                 //var YearofAcquisitionList =allYear.filter(x=> x>=data.tutorsInfo[0].certification[i].startDate.split('-')[0]);
                 //var acquisitionMonthList=allMonth.filter(x=>x.id>=data.tutorsInfo[0].certification[i].startDate.split('-')[1]);
                 var start=data.tutorsInfo[0].certification[i].startDate.split('-')[0];
                 var end =data.tutorsInfo[0].certification[i].yearOfAcquisition.split('-')[0];
                 var YearofAcquisitionList =allYear.filter(x=> x>=data.tutorsInfo[0].certification[i].startDate.split('-')[0]);
                
                 if(start==end){                  
                  var acquisitionMonthList=allMonth.filter(x=>x.id>=data.tutorsInfo[0].certification[i].startDate.split('-')[1]);                
                 }
                 else{
                 var acquisitionMonthList=allMonth;
                 }    
  

                  var form = {
                    experience: data.tutorsInfo[0].certification[i].experienceType,
                    experienceValid: false,
                    title: data.tutorsInfo[0].certification[i].title,
                    titleValid: false,
                    institution: data.tutorsInfo[0].certification[i].institution,
                    institutionValid: false,
                    location: data.tutorsInfo[0].certification[i].location,
                    locationValid: false,
                    stratDateYear: data.tutorsInfo[0].certification[i].startDate.split('-')[0],
                    stratDateYearValid: false,
                    stratDateMonth: data.tutorsInfo[0].certification[i].startDate.split('-')[1],
                    stratDateMonthValid: false,
                    acquisitionYear: data.tutorsInfo[0].certification[i].yearOfAcquisition.split('-')[0],
                    acquisitionYearValid: false,
                    acquisitionMonth: data.tutorsInfo[0].certification[i].yearOfAcquisition.split('-')[1],
                    acquisitionMonthValid: false,
                    descriptions: data.tutorsInfo[0].certification[i].descriptions,
                    descriptionsValid: false,
                    descriptionLength:200-data.tutorsInfo[0].certification[i].descriptions.length,
                    startYearList: this.getStartYear(),
                    YearofAcquisitionList: YearofAcquisitionList,
                    startDateMonthList:this.getStartMonth(),
                    acquisitionMonthList:acquisitionMonthList
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
  
    changeStartYear() {
  
    }
  }
  