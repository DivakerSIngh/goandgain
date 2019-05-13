import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../../../../../../modules/shared/loader'
import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';
import { LoginHeaderService } from '../../../../../../services/login-header.service';
declare var $: any;
@Component({
  selector: 'app-study-group-details',
  templateUrl: './study-group-details.component.html',
  styleUrls: ['./study-group-details.component.css']
})
export class StudyGroupDetailsComponent implements AfterViewInit {


  deleteCommentId: string = '';
  deleteCommentIndex: string = '';
  isOuterCommentForDelete: boolean;
  deleteInnerCommentId: string = '';
  deleteinnerCommentIndex: string = '';
  deleteOuterCommentIndex: string = '';

  groupDetails: any = [];
  createrName: string = '';
  totalHits: number = 0;
  isLoggedIn: boolean = false;
  comment: string = '';
  groupId: string = '';

  outerComment: any = [];
  innerComment: string = '';
  studetnImage: string = 'assets/images/textarea-user.png';
  userFullName: string = '';
  firstName: string = '';
  lastName: string = '';

  isMember: boolean = false;

  //edit comment var


  editCommentId: string = '';
  editCommentIndex: string = '';

  existsButPending:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    // private commanService: CommanService,
    private router: Router,
    private loginPopupService: LoginPopupService,
    public dialog: MatDialog,
    private loginHeaderService: LoginHeaderService
  ) { }


  ngOnInit() {
    this.loader.display(true);
    this.groupId = this.route.snapshot.paramMap.get("id");
    this.getGroupDetails(this.groupId);

    this.loginHeaderService.bs.subscribe((val: any) => {
      if (val.firstName != undefined || val.lastName != undefined || val.profilePic != undefined) {
        if (val.firstName) {
          this.userFullName = val.firstName + ' ' + val.lastName;
          this.firstName = val.firstName;
          this.lastName = val.lastName;
          this.studetnImage = val.profilePic;
          // this.email=val.email;
        }
        else {
          //  this.isLoggedIn = false;
        }
      }
    });
    if (this.studentService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

  }


  ngAfterViewInit() {

  }
  openCloseCollaps(id) {
    this.innerComment = '';
    $('.collapse').collapse('hide');
    $('#' + id).collapse('show');
  }

  openCloseCollapsEditMainComment(thisId, thisIndex, message) {
    this.innerComment = message;
    this.editCommentId = thisId;
    this.editCommentIndex = thisIndex;
    $('.collapse').collapse('hide');
    $('#' + thisIndex).collapse('show');
  }

  openCloseCollapsEditInnerComment(thisId, thisIndex, parentId, parentIndex, message) {

    this.innerComment = message;
    this.editCommentId = thisId;
    this.editCommentIndex = thisIndex;
    $('.collapse').collapse('hide');
    $('#' + thisId).collapse('show');
  }





  editMainComment(comment, thisId, index) {

    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      comment: comment,
      messageId: thisId
    }
    localStorage.setItem('editIndex', index);
    localStorage.setItem('editedMessage', comment);
    this.studentService.editGroupComment(obj).subscribe((data) => {

      var index = localStorage.getItem('editIndex');
      var editedMessage = localStorage.getItem('editedMessage');
      if (data.code == '200') {

        this.groupDetails.comment[index].comment = editedMessage;


        this.comment = '';
        $('.collapse').collapse('hide');
        this.loader.display(false);

      } else {

        this.router.navigate(['']);
      }
    }, error => {

      this.loader.display(false);
      this.router.navigate(['']);
    });
  }


  SaveInnerComment(comment, commentId, outerIndex) {

    localStorage.setItem('outerIndex', outerIndex);

    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      comment: comment,
      messageId: commentId
    }

    this.studentService.postInnerComment(obj).subscribe((data) => {
      var loggedInId = localStorage.getItem('student-id');
      if (data.code == '200') {
        var recentInnerComment = {
          "_id": data.comment._id,
          "comment": data.comment.comment,
          "userId": {
            "_id": loggedInId,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "image": this.studetnImage
          },
          "created": data.comment.created
        }

        var outerIndex = localStorage.getItem('outerIndex');
        var allOldInnerComment = this.groupDetails.comment[outerIndex].replyData;
        this.groupDetails.comment[outerIndex].replyData = [];
        var allComment = [];
        allComment.push(recentInnerComment);
        for (var i = 0; i < allOldInnerComment.length; i++) {
          allComment.push(allOldInnerComment[i]);
        }
        // this.outerComment = allComment;
        this.groupDetails.comment[outerIndex].replyData = allComment;
        this.comment = '';
        $('.collapse').collapse('hide');
        this.loader.display(false);

      } else {
        this.router.navigate(['']);
      }
    }, error => {
      this.loader.display(false);
      this.router.navigate(['']);
    });
  }
  isInnerCommentInserted(): boolean {
    if (this.innerComment != '') {
      return false;
    }
    return true;
  }





  //Confirm comment Delete outer comment
  ConfirmCommentDelete(commentId, index) {

    $('.collapse').collapse('hide');
    this.deleteCommentId = commentId
    this.deleteCommentIndex = index;
    this.isOuterCommentForDelete = true;
    $('#deletePopUp').modal('show');
  }

  //Confirm comment Delete outer comment
  ConfirmInnerCommentDelete(commentId, innerIndex, parentIndex, parentCommentId) {

    $('.collapse').collapse('hide');
    this.deleteInnerCommentId = commentId;
    this.deleteCommentId = parentCommentId;
    this.deleteinnerCommentIndex = innerIndex;
    this.deleteOuterCommentIndex = parentIndex;
    this.isOuterCommentForDelete = false;
    $('#deletePopUp').modal('show');
  }

  isMemberOrNot(): boolean {
    
    var loggedInId = localStorage.getItem('student-id');
    var isMember = this.groupDetails.members.filter(x => x.userId == loggedInId);

    var allMembers = this.groupDetails.members;
    for (var i = 0; i < allMembers.length; i++) {
      if (allMembers[i].userId._id == loggedInId && allMembers[i].memberStatus=='1') {
        this.router.navigate(['../student/student-profile/friends-group/group-details/' + this.groupDetails._id]);
      }
    }
    ////

    if (isMember.length > 0) {
      if (isMember[0].memberStatus == '1') {
        this.router.navigate(['../student/student-profile/friends-group/group-details/' + this.groupDetails._id]);
      } else {
        //this.isMember=true;
        return true;

      }
    } else {
      //this.isMember=false;
      return false;
    }
  }


  requestToJoin() {
    this.loader.display(true);
    this.studentService.sendJoinRequest(this.groupId).subscribe((data) => {

      if (data.code == '200') {
        this.isMember = true;
        this.loader.display(false);
      } else {
        this.router.navigate(['']);
        this.loader.display(false);
      }
    }, error => {

      this.loader.display(false);
      this.router.navigate(['']);
    });

  }

  deleteComment() {
    this.loader.display(true);
    if (this.isOuterCommentForDelete) {

      localStorage.setItem('deleteCommentIndex', this.deleteCommentIndex);
      this.studentService.deleteGroupComment(this.deleteCommentId, this.groupId).subscribe((data) => {

        if (data.code == '200') {
          var removeIndex = localStorage.getItem('deleteCommentIndex');
          this.outerComment.splice(removeIndex, 1);
          $('#deletePopUp').modal('hide');
          this.loader.display(false);
        } else {
          this.router.navigate(['']);
          this.loader.display(false);
        }
      }, error => {
        this.loader.display(false);
        this.router.navigate(['']);
      });

    }
    else {

      localStorage.setItem('deleteinnerCommentIndex', this.deleteinnerCommentIndex);
      localStorage.setItem('deleteOuterCommentIndex', this.deleteOuterCommentIndex);
      this.studentService.deleteGroupInnerComment(this.deleteInnerCommentId, this.deleteCommentId, this.groupId).subscribe((data) => {

        if (data.code == '200') {
          var removeParentIndex = localStorage.getItem('deleteOuterCommentIndex');
          var removeIndex = localStorage.getItem('deleteinnerCommentIndex');
          this.outerComment[removeParentIndex].replyData.splice(removeIndex, 1);
          $('#deletePopUp').modal('hide');
          this.loader.display(false);
        } else {
          this.loader.display(false);
          this.router.navigate(['']);
        }
      }, error => {

        this.loader.display(false);
        this.router.navigate(['']);
      });
    }
  }


  //added outer comment
  postComment() {
    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      comment: this.comment
    }

    this.studentService.postGroupComment(obj).subscribe((data) => {
      if (data.code == '200') {
        var loggedInId = localStorage.getItem('student-id');
        var recentComment = {
          "_id": data.commentData._id,
          "comment": data.commentData.comment,
          "userId": {
            "_id": loggedInId,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "image": this.studetnImage
          },
          "replyData": [

          ],
          "created": data.commentData.created
        }

        var details = this.groupDetails.comment;
        this.groupDetails.comment = [];
        var allComment = [];
        allComment.push(recentComment);

        for (var i = 0; i < details.length; i++) {
          allComment.push(details[i]);
        }
        this.outerComment = allComment;
        this.groupDetails.comment = allComment;
        this.comment = '';
        this.loader.display(false);
      } else {
        this.router.navigate(['']);
      }
    }, error => {
      this.loader.display(false);
      this.router.navigate(['']);
    });
  }
  isEntered(): boolean {
    if (this.comment != '') {
      return false;
    }
    return true;
  }
  getGroupDetails(groupId) {
    this.studentService.getGroupDetails(groupId).subscribe((data) => {

      if (data.code == '200') {

        this.groupDetails = data.groupData;
        this.isMember = this.isMemberOrNot();
        this.createrName = data.groupData.userId.firstName + ' ' + data.groupData.userId.lastName;
        this.totalHits = data.groupData.view;
        this.outerComment = data.groupData.comment;

        var loggedInUser = localStorage.getItem('student-id') || null;
        
          //check if request has been sent 
          for (var i = 0; i < data.groupData.members.length; i++) {
            
                      if (data.groupData.members[i].userId._id == loggedInUser) {
                        this.existsButPending = true;
                        break;
                      }
           }



        //check here wether exists or not


        for (var i = 0; i < data.groupData.members.length; i++) {

          if (data.groupData.members[i].userId._id == loggedInUser && data.groupData.members[i].memberStatus == '0') {
            this.isMember = true;
            break;
          }
        }

      this.loader.display(false);
      } else {
        this.loader.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.loader.display(false);
      this.router.navigate(['']);
    });
  };


  isMainCommentCreator(indexofComment): boolean {
    
    var creatorId = this.outerComment[indexofComment].userId._id;
    var loggedInId = localStorage.getItem('student-id');
    if (creatorId == loggedInId) {
      return true;
    }
    else {
      return false;
    }
  }

  isInnerCommentCreator(indexOfOuterComment, indexOfInnerComment): boolean {
    var creatorId = this.outerComment[indexOfOuterComment].replyData[indexOfInnerComment].userId._id;
    var loggedInId = localStorage.getItem('student-id');
    if (creatorId == loggedInId) {
      return true;
    }
    else {
      return false;
    }
  }
  // openLoginPopUp(): void {
  //   if (this.studentService.isLoggedIn()) {
  //      // this.router.navigate(['../../student/create-study-group/' + data.token]);
  //     this.router.navigate(['../study-group/create-study-group']);
  //   }
  //   else {     
  //     var obj = {
  //       status: true,
  //       url:'../study-group/create-study-group'
  //     }
  //     this.loginPopupService.setValueForLoginPopUp(obj);
  //   }
  // }


}

