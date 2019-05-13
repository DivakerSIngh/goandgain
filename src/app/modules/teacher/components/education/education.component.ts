import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HeaderService } from '../../../../header.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  providers: [TeacherService]
})
export class EducationComponent implements OnInit {



  experienceList: any[] = [];
  startYearList: any[] = [];
  YearofAcquisitionList: any[] = [];

  returnStartYearList: any[] = [];
  uploadValue: any[] = [];


  formData: any;
  validFileStatus: string;
  formStatus: string = '';

  //for preparing form in the html
  educationListPrepareForm: any[] = [];



  //for multilanguage
  ifInvalid:boolean=false;
  ifSizeExceed:boolean=false;
  ifInternalError:boolean=false;
  ifMoreThanFive:boolean=false;

  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private headerService: HeaderService
  ) {

  }

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
      experience: '0',
      experienceValid: false,
      title: '',
      titleValid: false,
      institution: '',
      institutionValid: false,
      location: '',
      locationValid: false,
      startDateYear: '0',
      startDateYearValid: false,
      startDateMonth: '0',
      startDateMonthList: this.getStartMonth(),
      startDateMonthValid: false,
      acquisitionYear: '0',
      acquisitionYearValid: false,
      acquisitionMonth: '0',
      acquisitionMonthList: this.getStartMonth(),
      acquisitionMonthValid: false,
      descriptions: '',
      descriptionsValid: false,
      descriptionLength: 200,
      startYearList: this.getStartYear(),
      YearofAcquisitionList: this.getStartYear()
    }
    this.educationListPrepareForm.push(form);
  }

  changeTextAreacount(value, index) {
    this.educationListPrepareForm[index].descriptionLength = 200 - value.length;
    // this.educationListPrepareForm[index].acquisitionYear = '0';
    // this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);
  }



  removeFile(index) {
    this.ifMoreThanFive=false;
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

    this.ifMoreThanFive=false;
    this.validFileStatus = '';
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

            this.formData.delete('userImage');
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

                this.ifInternalError=false;
                this.ifInvalid=false;
                this.ifSizeExceed=false;

                this.loaderService.display(false);
              }
              else {
                this.ifInternalError=true;
                this.ifInvalid=false;
                this.ifSizeExceed=false;
                // this.requiredStatus = 'There is some internal error.';
                // this.isImage = false;
                // this.loaderService.display(false);   
                this.router.navigate(['']);
              }


            }, error => {
              // validFileStatus
              
              this.ifInternalError=true;
              this.ifInvalid=false;
              this.ifSizeExceed=false;
              this.loaderService.display(false);
              console.log(error.code);
              //this.router.navigate(['']);
            });

          }
          else {
            
            this.ifInvalid=false;
            this.ifSizeExceed=true;
            this.ifInternalError=false;
            this.loaderService.display(false);
            this.validFileStatus = 'File size can not be more than 1 MB.';
          }
        } else {
          this.ifInvalid=true;
          this.ifSizeExceed=false;
          this.ifInternalError=false;
          this.loaderService.display(false);
          // this.validFileStatus = "You can upload only pdf, doc, docx, xlsx, xls, jpg, jpeg, png.";
          this.validFileStatus = "Please upload a valid file.";

        }
      }

    }
    else {
      this.ifMoreThanFive=true;
      this.loaderService.display(false);
      this.validFileStatus = "You can upload only 5 valid file.";
    }

  }










  ChangeStartMonth(index, month) {

    this.educationListPrepareForm[index].acquisitionMonthList = [];
    // this.educationListPrepareForm[index].acquisitionYear = '0';
    this.educationListPrepareForm[index].acquisitionMonth = '0';
    this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >= month);


    //set month
    if (this.educationListPrepareForm[index].acquisitionYear == this.educationListPrepareForm[index].startDateYear) {
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].acquisitionMonth = '0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >= month);
    }
    else {
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].acquisitionMonth = '0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList;//.filter(x => x.id >=month);
    }
  }

  ChangeStartDate(index, year) {
    this.educationListPrepareForm[index].YearofAcquisitionList = [];
    this.educationListPrepareForm[index].acquisitionYear = '0';
    this.educationListPrepareForm[index].acquisitionMonth = '0';
    this.educationListPrepareForm[index].YearofAcquisitionList = this.educationListPrepareForm[index].startYearList.filter(x => x >= year);



  }

  setMonth(index, month) {
    if (this.educationListPrepareForm[index].acquisitionYear == this.educationListPrepareForm[index].startDateYear) {
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].acquisitionMonth = '0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList.filter(x => x.id >= month);
    }
    else {
      this.educationListPrepareForm[index].acquisitionMonthList = [];
      // this.educationListPrepareForm[index].acquisitionYear = '0';
      this.educationListPrepareForm[index].acquisitionMonth = '0';
      this.educationListPrepareForm[index].acquisitionMonthList = this.educationListPrepareForm[index].startDateMonthList;//.filter(x => x.id >=month);
    }
  }

  removeFormFromDome(index) {
    this.formStatus = '';
    this.educationListPrepareForm.splice(index, 1);
  }

  addNewForm() {
    if (this.educationListPrepareForm.length <= 4) {
      this.formStatus = '';
      var form = {
        experience: '0',
        experienceValid: false,
        title: '',
        titleValid: false,
        institution: '',
        institutionValid: false,
        location: '',
        locationValid: false,
        startDateYear: '0',
        startDateYearValid: false,
        startDateMonth: '0',
        startDateMonthList: this.getStartMonth(),
        startDateMonthValid: false,
        acquisitionYear: '0',
        acquisitionYearValid: false,
        acquisitionMonth: '0',
        acquisitionMonthList: this.getStartMonth(),
        acquisitionMonthValid: false,
        descriptions: '',
        descriptionsValid: false,
        descriptionLength: 200,
        startYearList: this.getStartYear(),
        YearofAcquisitionList: this.getStartYear()
      }
      this.educationListPrepareForm.push(form);
    }
    else {
      this.formStatus = 'You can add only 5 certificates';
    }
  }

  getEducationList() {
    this.experienceList.push('Associate Degree');
    this.experienceList.push('Bachelor Degree');
    this.experienceList.push('Graduate Degree');
    this.experienceList.push('Master Degree');
    this.experienceList.push('Doctoral Degree');
    this.experienceList.push('Professional Degree');
    this.experienceList.push('Non college Graduate');
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
  getStartMonth(): any[] {
    var month = [];
    var obj1 = { id: 1, value: 'January' }
    month.push(obj1);
    var obj2 = { id: 2, value: 'February' }
    month.push(obj2);
    var obj3 = { id: 3, value: 'March' }
    month.push(obj3);
    var obj4 = { id: 4, value: 'April' }
    month.push(obj4);
    var obj5 = { id: 5, value: 'May' }
    month.push(obj5);
    var obj6 = { id: 6, value: 'June' }
    month.push(obj6);
    var obj7 = { id: 7, value: 'July' }
    month.push(obj7);
    var obj8 = { id: 8, value: 'August' }
    month.push(obj8);
    var obj9 = { id: 9, value: 'September' }
    month.push(obj9);
    var obj10 = { id: 10, value: 'October' }
    month.push(obj10);
    var obj11 = { id: 11, value: 'November' }
    month.push(obj11);
    var obj12 = { id: 12, value: 'December' }
    month.push(obj12);
    return month;
  }


  gotoPreviouseStep() {
    this.router.navigate(['../../teacher/language']);

  }





  //here showing the validation error
  showValidation() {
    for (let i = 0; i < this.educationListPrepareForm.length; i++) {
      if (this.educationListPrepareForm[i].experience != '0' && this.educationListPrepareForm[i].experience != '') {
        this.educationListPrepareForm[i].experienceValid = false;
      }
      else {
        this.educationListPrepareForm[i].experienceValid = true;
      }
      if (this.educationListPrepareForm[i].title != '0' && this.educationListPrepareForm[i].title != '') {
        this.educationListPrepareForm[i].titleValid = false;
      }
      else {
        this.educationListPrepareForm[i].titleValid = true;
      }


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

      if (this.educationListPrepareForm[i].startDateYear != '0' && this.educationListPrepareForm[i].startDateYear != '') {
        this.educationListPrepareForm[i].startDateYearValid = false;
      }
      else {
        this.educationListPrepareForm[i].startDateYearValid = true;
      }

      if (this.educationListPrepareForm[i].startDateMonth != '0' && this.educationListPrepareForm[i].startDateMonth != '') {
        this.educationListPrepareForm[i].startDateMonthValid = false;
      }
      else {
        this.educationListPrepareForm[i].startDateMonthValid = true;
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
      if (this.educationListPrepareForm[i].experience == '0' || this.educationListPrepareForm[i].experience == '') {
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

      if (this.educationListPrepareForm[i].startDateYear == '0' || this.educationListPrepareForm[i].startDateYear == '') {
        return false;
      }

      if (this.educationListPrepareForm[i].startDateMonth == '0' || this.educationListPrepareForm[i].startDateMonth == '') {
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
          "startDate": this.educationListPrepareForm[i].startDateYear + '-' + this.educationListPrepareForm[i].startDateMonth + '-01',
          "yearOfAcquisition": this.educationListPrepareForm[i].acquisitionYear + '-' + this.educationListPrepareForm[i].acquisitionMonth + '-01',
          "descriptions": this.educationListPrepareForm[i].descriptions
        }
        experienceData.push(obj);

      }
      var docs = [];
      for (let i = 0; i < this.uploadValue.length; i++) {
        docs.push(this.uploadValue[i].fileLocation)
      }

      this.teacherService.saveTeacherEducationDetails(experienceData, docs).subscribe((data) => {
        if (data.code == '200') {
          this.loaderService.display(false);
          this.router.navigate(['../../teacher/certification']);

        }
        else {

          //this.router.navigate(['']);
        }


      }, error => {

        //this.router.navigate(['']);
      });

      // }
      // else {
      //   this.validFileStatus = "Please upload you diploma(s)";
      // }
    }
    else {
      window.scrollTo(0, 0);
    }
  }


  skipStep() {
    this.router.navigate(['../../teacher/certification']);
  }
  //fetching teacher information method
  getTeacherInformation() {
    this.teacherService.getTeacherInformation().subscribe((data) => {
      if (data.code == '200') {
        if (data.tutorsInfo.length > 0) {

          if (data.tutorsInfo[0].educationDocs != undefined && data.tutorsInfo[0].educationDocs.length > 0) {

            for (let i = 0; i < data.tutorsInfo[0].educationDocs.length; i++) {
              var fileName = data.tutorsInfo[0].educationDocs[i];
              var fileLength = fileName.split('/');
              var NameName = fileLength[fileLength.length - 1];
              if (data.tutorsInfo[0].educationDocs[i].length > 0) {
                var obj = {
                  fileName: NameName,
                  fileLocation: data.tutorsInfo[0].educationDocs[i]
                }
                this.uploadValue.push(obj);
              }
            }
          }
          if (data.tutorsInfo[0].education != undefined && data.tutorsInfo[0].education.length > 0) {
            this.educationListPrepareForm = [];

            for (let i = 0; i < data.tutorsInfo[0].education.length; i++) {
              var allMonth = this.getStartMonth();
              var allYear = this.getStartYear();
              var start = data.tutorsInfo[0].education[i].startDate.split('-')[0];
              var end = data.tutorsInfo[0].education[i].yearOfAcquisition.split('-')[0];
              var YearofAcquisitionList = allYear.filter(x => x >= data.tutorsInfo[0].education[i].startDate.split('-')[0]);

              if (start == end) {
                var acquisitionMonthList = allMonth.filter(x => x.id >= data.tutorsInfo[0].education[i].startDate.split('-')[1]);
              }
              else {
                var acquisitionMonthList = allMonth;
              }
              var form = {
                experience: data.tutorsInfo[0].education[i].experienceType,
                experienceValid: false,
                title: data.tutorsInfo[0].education[i].title,
                titleValid: false,
                institution: data.tutorsInfo[0].education[i].institution,
                institutionValid: false,
                location: data.tutorsInfo[0].education[i].location,
                locationValid: false,
                startDateYear: data.tutorsInfo[0].education[i].startDate.split('-')[0],
                startDateYearValid: false,
                startDateMonth: data.tutorsInfo[0].education[i].startDate.split('-')[1],
                startDateMonthValid: false,
                acquisitionYear: data.tutorsInfo[0].education[i].yearOfAcquisition.split('-')[0],
                acquisitionYearValid: false,
                acquisitionMonth: data.tutorsInfo[0].education[i].yearOfAcquisition.split('-')[1],
                acquisitionMonthValid: false,
                descriptions: data.tutorsInfo[0].education[i].descriptions,
                descriptionsValid: false,
                startYearList: this.getStartYear(),
                YearofAcquisitionList: YearofAcquisitionList,
                descriptionLength: 200 - data.tutorsInfo[0].education[i].descriptions.length,
                startDateMonthList: this.getStartMonth(),
                acquisitionMonthList: acquisitionMonthList
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
