import { Component, OnInit, } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

import { LoginPopupService } from '../../../services/login-popup.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StudentService } from '../../../services/student.service'
import { LoaderService } from '../../shared/loader'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  groupAddedMembers: any = [];
  constructor(private loginPopupService: LoginPopupService,
    private studentService: StudentService,
    private loader: LoaderService) { }

  search: any = '';
  limit: number = 0;
  myFriends: any = [];
  studyGroupId:any=0;
  canLeave:boolean=false;
  norecordFound: boolean = false;
  ngOnInit() {
    this.loginPopupService.bs.subscribe((val: any) => {
      
      
      //  $('#groupAddedMemberPopup').modal('hide');

      //for opening show member list
      if (val.openMemberPopUp != undefined && val.openMemberPopUp == true && val.memberInfo != undefined) {
        this.groupAddedMembers = val.memberInfo;
        this.studyGroupId=val.studyGroupId;
        this.canLeave=val.canLeave;
        $('#groupAddedMemberPopup').modal('show');
      }
      else {
        $('#groupAddedMemberPopup').modal('hide');
      };


      //for opening invite member popup
      if (val.openInvitePopup != undefined && val.openInvitePopup == true && val.studyGroupId != undefined) {
       // this.groupAddedMembers = val.memberInfo;
        this.studyGroupId=val.studyGroupId;
      //  this.canLeave=val.canLeave;
        $('#InviteModal').modal('show');
      }
      else {
        $('#InviteModal').modal('hide');
      }


    })





    this.GetFriendList(this.search, this.limit)    
  }



  searchFriendsByKeyDown(event){
    
    if (event.keyCode == 13) {
      this.limit=0;
      this.loader.display(true);
      this.GetFriendList(this.search, this.limit);
    }
  }

  GetFriendList(search, limit) {
    this.loader.display(true);
    this.studentService.getNonGroupMembersFriends(search, limit,this.studyGroupId).subscribe((data) => {
      
    this.studentService.searchConnectedFriend(search, limit).subscribe((data) => {
    
      if (data.code == '200') {
        this.myFriends = data.data;
        this.norecordFound = false;
      } else {
        this.myFriends = [];
        this.norecordFound = true;
        //this.router.navigate(['']);
      }
      this.loader.display(false);

    }, error => {

      this.loader.display(false);
      this.norecordFound = true;
      this.myFriends = [];
      //   if (error.code == 501) {
      //   this.router.navigate(['']);
      // }
    });
  });
}


  RemoveMember(joinRequestId,i){
    this.loader.display(true);
    localStorage.setItem('removeIndex', i);    
    this.studentService.RemoveMemberFromGroup(joinRequestId,this.studyGroupId).subscribe((data) => {
      
      if (data.code == '200') {
        var removeIndex = localStorage.getItem('removeIndex');
        localStorage.removeItem('removeIndex');
        this.groupAddedMembers.splice(removeIndex, 1);

      }
        this.loader.display(false);
      
    }, error => {
      this.loader.display(false);
     
    });
  }



  searchFriend() {
    this.limit = 0;
    this.GetFriendList(this.search, this.limit);
  }

  isAdmin(Id):boolean{
    var loggedInId = localStorage.getItem('student-id');
    if(loggedInId==Id){
      return false;
    }
    return true;
  }

  sendRequestToJoin(frId,index){
    this.loader.display(true);
    localStorage.setItem('sendRequestIndex',index);    
    this.studentService.InviteFriendsOnGroup(frId,this.studyGroupId).subscribe((data) => {
      
      if (data.code == '200') {
        var removeIndex = localStorage.getItem('sendRequestIndex');
        localStorage.removeItem('sendRequestIndex');
        this.myFriends.splice(removeIndex, 1);
      }
else
{
  //may be group is full;
}
        this.loader.display(false);
      
    }, error => {
      this.loader.display(false);
     
    });
  }
}



