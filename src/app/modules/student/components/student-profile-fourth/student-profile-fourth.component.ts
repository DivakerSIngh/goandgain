import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../services/student.service'
import { LoaderService } from '../../../../modules/shared/loader'
import{LoginHeaderService} from '../../../../services/login-header.service'

import { HeaderService } from '../../../../header.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-student-profile-fourth',
  templateUrl: './student-profile-fourth.component.html',
  styleUrls: ['./student-profile-fourth.component.css'],
  providers: [StudentService]
})
export class StudentProfileFourthComponent implements OnInit {

  purpose: string;
  //intrest: string;
  intrest: any[] = [];
  allIntrest: any[] = [];
  allInrestInner: any[] = [];
  allSelectedintrestInner: any[] = [];
  intrestName: string;
  validationStatus: string='';

  additionalInformation: string;
  remainingChar:number;

  intrestCheck:string='1';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private loaderService: LoaderService,
    private headerService: HeaderService,
    private loginHeaderService:LoginHeaderService
  ) { }

  ngOnInit() {
    //hide and disable the header component
    this.headerService.setHeaderValue(true);

    this.loaderService.display(true);
    this.purpose = '1';
    //this.intrest = '1';
    // this.intrest.push(1);
    this.remainingChar=200;
    this.getStudnetIntrest();

  }
  //active menu of interst
  checkForIntrest(existvalue) {
    let exist = this.intrest.filter(x => x == existvalue);
    if (exist.length > 0) {
      return true;
    }
    return false;
  }

  ChangePurpose(purpose) {
    this.purpose = purpose;
  }
  goToThiredStep() {
    this.router.navigate(['../../student/student-profile-third-step'])
  }


  //get student intrestOptions
  getStudnetIntrest() {

    this.studentService.getStudentIntrest().subscribe((data) => {
     
      if (data.code == '200') {

        if (data.dataGrid.length > 0) {
          this.allIntrest = data.dataGrid;
          let inner = this.allIntrest.filter(x => x._id == 1);
          this.intrestName = inner[0].name;
          this.allInrestInner = inner[0].innerData;

        } else {
          this.router.navigate(['']);
        }
        if (data.data.length > 0) {
          if(data.data[0].purpose!=undefined){
            this.purpose=data.data[0].purpose;
          }

          if(data.data[0].parantInterest!=undefined){
            this.intrest=[];
            for(let i=0;i<data.data[0].parantInterest.length;i++){
              this.intrest.push(data.data[0].parantInterest[i]);
            };
          }
          if (data.data[0].interests != undefined) {
            this.allSelectedintrestInner=[];
          for(let i=0;i<data.data[0].interests.length;i++){
            this.allSelectedintrestInner.push(data.data[0].interests[i]);
           
          };
          }
          if (data.data[0].additionalInfo != undefined) {
            this.additionalInformation = data.data[0].additionalInfo;
            this.remainingChar= 200-this.additionalInformation.length;
          }
          // if (data.data[0].interests != undefined) {
          //    this.allSelectedintrestInner = data.data[0].interests;
          //    let inner = this.allIntrest;//.filter(x => x._id == this.intrest);
          //   // this.intrestName =inner[0].name;
          //    this.allInrestInner = inner[0].innerData;
          // }
        this.loaderService.display(false);
        //  } else {
        //   this.router.navigate(['']);
         }
      }
      else {

        this.router.navigate(['']);

      }
    }, error => {
      
      //   if (error.code == 501) {
      this.router.navigate(['']);
      // }
    });
  };



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


  removeAllPerentChild(_id) {

    alert('removeAllPerentChild')
  
 
    var indexOfArray = this.intrest.indexOf(x=> x==_id);
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

  addRemoveSelection(value) {
    this.validationStatus = '';
    if (this.allSelectedintrestInner.length > 0) {
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

       // var indexOfArray = this.allSelectedintrestInner.indexOf(selection[0]);
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
  if(purpose=='change'){

    this.validationStatus = '';
    let exist = this.intrest.filter(x => x == intrest);
    if (exist.length > 0) {
     // var indexOfArray = this.intrest.indexOf(exist[0]);
      //this.intrest.splice(indexOfArray,1);
      

      //removing the child selection 
      let inner = this.allIntrest.filter(x => x._id == intrest);
      var innerData = inner[0].innerData;
      this.intrestName = inner[0].name;
      this.allInrestInner = innerData;

      // for (var i = 0; i < innerData.length; i++) {
      //   let arryValue = innerData[i]._id;
      //   var indexOfArray = this.allSelectedintrestInner.indexOf(arryValue);
      //   //this.allSelectedintrestInner.splice(indexOfArray,1);
      // }

    }
    else {
      let inner = this.allIntrest.filter(x => x._id == intrest);
      this.intrestName = inner[0].name;
      this.allInrestInner = inner[0].innerData;
    }
  }
  else{
    var indexOfArray = this.intrest.findIndex(x=> x==intrest);
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
  //save student data
  saveData() {
    
    this.loaderService.display(true);
    if (this.allSelectedintrestInner.length > 0) {
      this.validationStatus = '';
      var obj = {
        purpose: this.purpose,
        parantInterest: this.intrest,
        intrest: this.allSelectedintrestInner,
        additionalInformation: this.additionalInformation
      }
      this.studentService.saveStudentFourthStepData(obj).subscribe((data) => {
        if (data.code == '200') {

          this.studentService.getStudentInformation().subscribe((data) => {
            if (data.code == '200') {
              
              var object = {
                firstName: data.data[0].firstName,
                lastName: data.data[0].lastName,
                profilePic: data.data[0].image,
                email:data.data[0].email,
                userRole: data.data[0].roleId
              }
              
              let token = localStorage.getItem('auth-token');
              localStorage.setItem('student-details', JSON.stringify(object));
              localStorage.setItem('student-auth-token', token);
              localStorage.setItem('userRole', data.data[0].roleId);
              localStorage.setItem('studentEmail',data.data[0].email);
              localStorage.setItem('student-id',data.data[0]._id);
              this.loginHeaderService.setLoginValue(object);              
              this.headerService.setHeaderValue(false);
              this.router.navigate(['../../student/student-profile/lessons/scheduled-lesson']);
            }
          },
        (error)=>{
          this.loaderService.display(false);
        }
      );
         
        } else {
          this.loaderService.display(true);
          this.router.navigate(['']);
        }
      }, error => {
        console.log(error.code)

      });
    } else {
      this.loaderService.display(false);
      this.validationStatus = 'Please check at least 1 interest';
    }
  }

  getTextAreacount(){
   this.remainingChar= 200-this.additionalInformation.length;
  }

}
