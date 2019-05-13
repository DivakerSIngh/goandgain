import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../../../../../../modules/shared/loader'
import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';
@Component({
  selector: 'app-study-group-list',
  templateUrl: './study-group-list.component.html',
  styleUrls: ['./study-group-list.component.css']
})
export class StudyGroupListComponent implements OnInit {

  studyGroup: any;
  noGroupFound: boolean = false;
  search: string = '';
  limit: number = 0;
  sortKey: string = 'created';
  sortType: number = 1;
  languageList:any=[];
  language:any=0;

  //currentLimit:number=0;
  paging: any = [];
  constructor(private studentService: StudentService,
    private loaderService: LoaderService,
    // private commanService: CommanService,
    private router: Router,
    private loginPopupService: LoginPopupService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loaderService.display(true);
    this.getStudyGroups(this.search, this.limit, this.sortKey, this.sortType,this.language);
    //this.loaderService.display(false);
    this.getLanguge();
  }

  changePaging(page) {
    this.loaderService.display(true);
    this.limit = page;
    this.getStudyGroups(this.search, this.limit, this.sortKey, this.sortType,this.language);
    this.loaderService.display(false);
  }



  resetSearch(){
    this.search='';
    this.language=0;
    this.loaderService.display(true);
    console.log(this.search);
    this.getStudyGroups(this.search, this.limit, this.sortKey, this.sortType,this.language);
    this.loaderService.display(false);
    
  }


  getLimitedDescription(description):string{
    if(description.length>60){
    return description.substr(0,60) + '...';
    }
    return description;
  }

  searchStudyGroup() {
    // if(this.search!=''){
    this.getStudyGroups(this.search, this.limit, this.sortKey, this.sortType,this.language);

   // }
  }

  getLanguge() {
    this.studentService.getStudentLanguages().subscribe((data) => {

      if (data.code == '200') {
        this.languageList = data.data;
      } else {
        //this.router.navigate(['']);
      }
    }, error => {
      this.loaderService.display(false);
      //this.router.navigate(['']);
    });
  }


  openLoginPopUp(): void {
    if (this.studentService.isLoggedIn()) {
      // this.router.navigate(['../../student/create-study-group/' + data.token]);
      this.router.navigate(['../study-group/create-study-group']);
    }
    else {
      var obj = {
        status: true,
        url: '../study-group/create-study-group'
      }
      this.loginPopupService.setValueForLoginPopUp(obj);
    }
  }

  getStudyGroups(search, limit, sortKey, sortType,language) {
    console.log(search, limit, sortKey, sortType);
    this.loaderService.display(true);
    this.studentService.findStudyGroups(search, limit, sortKey, sortType,language).subscribe((data) => {
     
      if (data.code == '200') {
        this.noGroupFound = false;
        this.studyGroup = data.groups;
       // window.scrollTo(0, 120);
       window.scrollTo(0, 0);
        this.paging = [];
        for (var i = 0; i < data.limit.length; i++) {
          var obj = {
            show: i + 1,
            value: data.limit[i]
          }
          this.paging.push(obj);
          // this.limit=0;
        }
      }
      else if (data.code == '404') {
        
        this.noGroupFound = true;
        this.studyGroup = [];
        this.paging = [];
        this.limit = 0;
      }
     this.loaderService.display(false);
    }, error => {
      
     this.loaderService.display(false);
      console.log(error.code);
      this.noGroupFound = true;
      this.studyGroup = [];
      this.paging = [];
      this.limit = 0;
    });
  }

  detailsOfStudyGroups(groupId, index) {
    
    if (this.studentService.isLoggedIn()) {
      var isMember=false;
      var loggedInUser=localStorage.getItem('student-id')||null;
      var groupDetails = this.studyGroup[index];
      for(var i=0;i<groupDetails.members.length;i++){
        
        if(groupDetails.members[i].userId._id==loggedInUser && groupDetails.members[i].memberStatus=='1'){
          isMember=true;
          break;
        }
      }
      if (isMember) {
        this.router.navigate(['../student/student-profile/friends-group/group-details/' + groupId]);
      } else {
        this.router.navigate(['../study-group/study-group-detail/', groupId]);
      }
    }
    else {
      this.router.navigate(['../study-group/study-group-detail/', groupId]);
    }

  }

}
