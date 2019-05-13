import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../../../../../../modules/shared/loader'
//import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
//import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';
//import { LoginHeaderService } from '../../../../../../services/login-header.service';


declare var $: any;
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requestList: any = [];
  limit: number = 0;
  norecordFound: boolean = false;


  groupImage: any;
  groupName: any;
  groupSubject: any;
  categoryName: any;
  subCategoryName: any;
  groupTimeZone: any;
  groupHits: any;
  groupActiveMmber: any;
  groupDescription: any;
  groupLangauge: any;
  createdBy: any;

  groupRequestId: any;
  groupId: any;
  currentIndex: any;
  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    // private commanService: CommanService,
    private router: Router
    //private loginPopupService: LoginPopupService,
    //public dialog: MatDialog,
    //private loginHeaderService: LoginHeaderService
  ) { }

  ngOnInit() {
    this.loader.display(true);
    this.getPendingRequest(this.limit);
  }

  getPendingRequest(limit) {
    this.studentService.getPendingFriendsRequestList(limit).subscribe((data) => {
      
      if (data.code == '200') {
        this.norecordFound = false;
        this.requestList = data.data;
      } else if (data.code == '404') {
        this.norecordFound = true;
        this.requestList = [];
      }
      this.loader.display(false);

    }, error => {
      this.loader.display(false);
      //   if (error.code == 501) {
      //   this.router.navigate(['']);
      // }
    });
  };


  reqId: any;
  index: any;
  decline(reqId, index, action): void {
    
    if (action == 1) {


      this.loader.display(true);

      localStorage.setItem('indexOfrequestFriend', index);
      this.studentService.deleteFriendRequest(reqId).subscribe((data) => {
        
        if (data.code == '200') {
          var index = localStorage.getItem('indexOfrequestFriend');
          localStorage.removeItem('indexOfrequestFriend');

          if (index != null) {
            this.requestList.splice(index, 1);
          }
          $('#declineFriendRequest').modal('hide');
        }
        this.loader.display(false);

      }, error => {
        this.loader.display(false);
        //   if (error.code == 400) {
        // this.router.navigate(['']);
        // }
      });
    }
    else if (action == 0) {
      this.reqId = reqId;
      this.index = index;
      $('#declineFriendRequest').modal('show');
    }

  }

  confirmDecline() {
    
    this.decline(this.reqId, this.index, 1)
  }

  accept(reqId, index): void {
    this.loader.display(true);
    
    localStorage.setItem('indexOfrequestFriend', index);
    this.studentService.acceptFriendRequest(reqId).subscribe((data) => {
      
      if (data.code == '200') {
        var index = localStorage.getItem('indexOfrequestFriend');
        localStorage.removeItem('indexOfrequestFriend');
        
        if (index != null) {
          this.requestList.splice(index, 1);
        }

      }
      this.loader.display(false);

    }, error => {
      this.loader.display(false);
      //   if (error.code == 400) {
      // this.router.navigate(['']);
      // }
    });


  }



  ViewGroupDetails(req, index) {
    this.groupImage = req.image;
    this.groupName = req.name;

    this.groupSubject = req.subject;
    this.categoryName = req.category;
    this.subCategoryName = req.subCategory;
    this.groupTimeZone = '(' + req.timeZone + ')' + req.country;
    this.groupLangauge = req.language;
    this.groupDescription = req.description;
    this.groupHits = req.view;
    this.createdBy = req.userId.firstName + ' ' + req.userId.lastName;
    var loginStudentId = localStorage.getItem('student-id');
    this.groupId = req._id;
    this.currentIndex = index;

    //here finding the requestId
    for (var i = 0; i < req.members.length; i++) {
      if (req.members[i].userId._id == loginStudentId) {
        this.groupRequestId = req.members[i]._id
        break;
      }
    }

    $('#popupGroupRequestDetails').modal('show');
  }


declineGroupId:any;
declineIndex:any;
  //button click for decline group request
  OnClickToDeclineRequest(req, index) {
    this.declineGroupId=req._id;
    this.declineIndex=index;
    var loginStudentId = localStorage.getItem('student-id');
    for (var i = 0; i < req.members.length; i++) {
      if (req.members[i].userId._id == loginStudentId) {
        this.groupRequestId = req.members[i]._id
        break;
      }
    }
    $('#declineGroupRequestPopUp').modal('show');
    //this.DeclineGroupRequest(this.groupRequestId, req._id, index);
  }

confirmDeclineGroupRequest(){
  this.DeclineGroupRequest(this.groupRequestId, this.declineGroupId,this.declineIndex);
}

  DeclineGroupRequest(reqId, groupId, index) {
    this.loader.display(true);
    localStorage.setItem('indexOfrequestFriend', index);
    this.studentService.DeclineGroupRequest(reqId, groupId).subscribe((data) => {
      
      if (data.code == '200') {
        var index = localStorage.getItem('indexOfrequestFriend');
        localStorage.removeItem('indexOfrequestFriend');
        if (index != null) {
          this.requestList.splice(index, 1);
        }
        $('#declineGroupRequestPopUp').modal('hide');
      }
      this.loader.display(false);
    }, error => {
      
      this.loader.display(false);
      //   if (error.code == 400) {
      // this.router.navigate(['']);
      // }
    });


  }






  //button click for accept group request
  OnClickToAcceptRequest(req, index) {
    
    var loginStudentId = localStorage.getItem('student-id');
    for (var i = 0; i < req.members.length; i++) {
      if (req.members[i].userId._id == loginStudentId) {
        this.groupRequestId = req.members[i]._id
        break;
      }
    }
    this.AccepteGroupRequest(this.groupRequestId, req._id, index);
  }

  AccepteGroupRequest(reqId, groupId, index) {

    this.loader.display(true);
    localStorage.setItem('indexOfrequestFriend', index);
    this.studentService.acceptGroupRequest(reqId, groupId).subscribe((data) => {
      
      if (data.code == '200') {
        var index = localStorage.getItem('indexOfrequestFriend');
        localStorage.removeItem('indexOfrequestFriend');
        if (index != null) {
          this.requestList.splice(index, 1);
        }
      }
      this.loader.display(false);
    }, error => {
      
      this.loader.display(false);
      //   if (error.code == 400) {
      // this.router.navigate(['']);
      // }
    });


  }

}
