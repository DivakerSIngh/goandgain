import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../../../../../../modules/shared/loader'
import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';

import { TeacherService } from '../../../../../../services/teacher.service';

import { LoginHeaderService } from '../../../../../../services/login-header.service';

declare var $: any;
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements AfterViewInit {

  isToggle: Boolean = false;
  groupDetails: any = [];
  addedMembers: any = [];
  createrName: string = '';
  totalHits: number = 0;
  isLoggedIn: boolean = false;
  noticedMessage: string = '';
  formData: any;
  groupId: string = '';
  comment: string = '';
  canLeave: boolean = true;


  outerComment: any = [];
  allNotice: any = [];
  innerComment: string = '';
  studetnImage: string = 'assets/images/textarea-user.png';
  moreFriends: number = 0;

  userFullName: string = '';
  firstName: string = '';
  lastName: string = '';



  deleteCommentId: string = '';
  deleteCommentIndex: string = '';
  isOuterCommentForDelete: boolean;
  deleteInnerCommentId: string = '';
  deleteinnerCommentIndex: string = '';
  deleteOuterCommentIndex: string = '';


  editCommentId: string = '';
  editInnerCommentId: string = '';
  editInnerIndex: string = '';
  editOuterIndex = '';

  editCommentIndex: string = '';
  groupOption: string = '0';


  noticeId: any;
  noticeIndex: any
  commentId: any;

  invalidFileMessage:string='';

  ngAfterViewInit() {
    $('#deletePopUp').modal('hide');
  }
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    // private commanService: CommanService,
    private router: Router,
    private loginPopupService: LoginPopupService,
    public dialog: MatDialog,
    private loginHeaderService: LoginHeaderService,
    private teacherService: TeacherService) {
    $('#deletePopUp').modal('hide');
  }

  ngOnInit() {
    this.formData = new FormData();
    this.loader.display(true);
    this.groupId = this.route.snapshot.paramMap.get("id");
    this.getGroupDetails(this.groupId);
    //this.loader.display(false);
    if (this.studentService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
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

    //for stopping popup to show automatically
    var obj = {
    }
    this.loginPopupService.setValueForLoginPopUp(obj);
    window.scrollTo(0, 0);
  }

  seeMore(){
    this.isToggle = !this.isToggle
  }

  isInnerCommentInserted(): boolean {
    if (this.innerComment != '') {
      return false;
    }
    return true;
  }

  openCloseCollaps(id) {
    this.innerComment = '';
    $('.collapse').collapse('hide');
    $('#' + id).collapse('show');
  }


  openCloseCollapsForEditOuterComment(id, message, indexOfComment) {

    this.innerComment = message;
    this.editCommentId = id;
    $('.collapse').collapse('hide');
    $('#' + id).collapse('show');
  }

  //innerCom._id,innerIndex,i,com._id,innerCom.comment
  openCloseCollapsForEditInnerComment(thisId, thisIndex, parentIndex, perentId, message) {

    this.editCommentId = perentId;
    this.editInnerCommentId = thisId;
    this.editInnerIndex = thisIndex;
    this.editOuterIndex = parentIndex;
    this.innerComment = message;

    $('.collapse').collapse('hide');
    $('#' + thisId).collapse('show');
  }


  editInnerComment() {

  }


  editComment() {
    var editData = {
      message: this.innerComment,
      commentId: this.editCommentId,
      groupId: this.groupId
    }
    this.studentService.editGroupComment(editData).subscribe((data) => {
      
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
          //isNoticed
        }
        var details = this.groupDetails.internalComment;
        this.groupDetails.comment = [];
        var allComment = [];
        allComment.push(recentComment);

        for (var i = 0; i < details.length; i++) {
          allComment.push(details[i]);
        }
        this.outerComment = allComment;

        
        this.groupDetails.internalComment = allComment;
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

  getGroupDetails(groupId) {
    this.studentService.getGroupDetailsInternal(groupId).subscribe((data) => {
      if (data.code == '200') {
        
        //to hide the leave group option to admin
        var loggedInId = localStorage.getItem('student-id');
        if (data.groupData.userId._id == loggedInId) {
          this.canLeave = false;
        }
     
        this.groupDetails = data.groupData;

        this.allNotice = data.groupData.notice;

        this.addedMembers = data.groupData.members;
        
        this.outerComment = data.groupData.internalComment;

        //to show + icon in more friends
        this.moreFriends = this.addedMembers.length - 3;
        var isMember = false;
        var loggedInUser = localStorage.getItem('student-id') || null;
        var groupDetails = data.groupData.members;

        for (var i = 0; i < groupDetails.length; i++) {

          if (groupDetails[i].userId._id == loggedInUser && groupDetails[i].memberStatus == '1') {

            isMember = true;
            break;
          }
        }
        if (!isMember) {
          // this.router.navigate(['']);          
          this.router.navigate(['../study-group/study-group-detail/', groupId]);
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

  postComment() {
    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      comment: this.comment
    }
    this.studentService.postGroupCommentInternal(obj).subscribe((data) => {
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
          "created": data.commentData.created,
          "isNoticed": '0'
        }
        var details = this.groupDetails.internalComment;
        this.groupDetails.comment = [];
        var allComment = [];
        allComment.push(recentComment);

        for (var i = 0; i < details.length; i++) {
          allComment.push(details[i]);
        }
        this.outerComment = allComment;
        this.groupDetails.internalComment = allComment;
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

  viewMoreMember() {
    var obj = {
      openMemberPopUp: true,
      memberInfo: this.addedMembers,
      canLeave:this.canLeave,
      studyGroupId:this.groupId
    }
    this.loginPopupService.setValueForLoginPopUp(obj);
  }

  SaveInnerComment(comment, commentId, outerIndex) {

    localStorage.setItem('outerIndex', outerIndex);

    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      comment: comment,
      messageId: commentId
    }

    this.studentService.postInnerCommentIntername(obj).subscribe((data) => {

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
        localStorage.removeItem('outerIndex');
        var allOldInnerComment = this.groupDetails.internalComment[outerIndex].replyData;
        this.groupDetails.internalComment[outerIndex].replyData = [];
        var allComment = [];
        allComment.push(recentInnerComment);
        for (var i = 0; i < allOldInnerComment.length; i++) {
          allComment.push(allOldInnerComment[i]);
        }
        // this.outerComment = allComment;
        this.groupDetails.internalComment[outerIndex].replyData = allComment;
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

  //Confirm comment Delete outer comment
  ConfirmCommentDelete(commentId, index) {

    $('.collapse').collapse('hide');
    this.deleteCommentId = commentId
    this.deleteCommentIndex = index;
    this.isOuterCommentForDelete = true;
    $('#deletePopUp').modal('show');
  }

  deleteComment() {
    this.loader.display(true);
    if (this.isOuterCommentForDelete) {
      localStorage.setItem('deleteCommentIndex', this.deleteCommentIndex);
      this.studentService.deleteGroupCommentInteral(this.deleteCommentId, this.groupId).subscribe((data) => {
        if (data.code == '200') {
          
          var removeIndex = localStorage.getItem('deleteCommentIndex');
          localStorage.removeItem('deleteCommentIndex');
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
      this.studentService.deleteGroupInnerCommentInternal(this.deleteInnerCommentId, this.deleteCommentId, this.groupId).subscribe((data) => {
        if (data.code == '200') {
          var removeParentIndex = localStorage.getItem('deleteOuterCommentIndex');
          var removeIndex = localStorage.getItem('deleteinnerCommentIndex');

          localStorage.removeItem('deleteOuterCommentIndex');
          localStorage.removeItem('deleteinnerCommentIndex');


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

  ConfirmInnerCommentDelete(commentId, innerIndex, parentIndex, parentCommentId) {

    $('.collapse').collapse('hide');
    this.deleteInnerCommentId = commentId;
    this.deleteCommentId = parentCommentId;
    this.deleteinnerCommentIndex = innerIndex;
    this.deleteOuterCommentIndex = parentIndex;
    this.isOuterCommentForDelete = false;
    $('#deletePopUp').modal('show');
  }

  openCloseCollapsEditMainComment(thisId, thisIndex, message) {
    this.innerComment = message;
    this.editCommentId = thisId;
    this.editCommentIndex = thisIndex;
    $('.collapse').collapse('hide');
    $('#' + thisIndex).collapse('show');
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
    this.studentService.editGroupCommentInternal(obj).subscribe((data) => {

      var index = localStorage.getItem('editIndex');
      var editedMessage = localStorage.getItem('editedMessage');
      if (data.code == '200') {

        this.outerComment[index].comment = editedMessage;
        //this.outerComment

        this.comment = '';
        $('.collapse').collapse('hide');
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


  memberChoice(options) {
    // 1 for leave group, 2 for edit group
    if (options == '1') {
      this.studentService.leaveStudyGroup(this.groupId).subscribe((data) => {

        var index = localStorage.getItem('editIndex');
        var editedMessage = localStorage.getItem('editedMessage');
        localStorage.removeItem('editedMessage');
        if (data.code == '200') {
          this.router.navigate(['../study-group/study-group-detail/', this.groupId]);
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
    else if (options == '2') {
      this.router.navigate(['../study-group/edit-study-group/' + this.groupId]);
    }
  }



  postAsNotice(thisId, thisIndex) {

    this.loader.display(true);
    var obj = {
      studyGroupId: this.groupId,
      messageId: thisId
    }
    localStorage.setItem('noticedIndex', thisIndex);
    this.studentService.noticedCommentInGroups(obj).subscribe((data) => {

      if (data.code == '200') {
        var loggedInId = localStorage.getItem('student-id');
        var recentNoticed = {
          "commentId": data.data.commentId,
          "_id": data.data._id,
          "created": data.data.created,
          "commentData": [
            {
              "comment": data.data.commentData[0].comment,
              "userId": {
                "_id": loggedInId,
                "firstName": this.firstName,
                "lastName": this.lastName,
                "image": this.studetnImage
              },
              "_id": data.data.commentData[0]._id,
              "created": data.data.commentData[0].created
            }
          ]
        }

        

        var index = localStorage.getItem('noticedIndex');
        localStorage.removeItem('noticedIndex');
        this.outerComment[index].isNoticed = '1';


        var details = this.allNotice;
        this.allNotice = [];
        var allNoticed = [];
        allNoticed.push(recentNoticed);

        for (var i = 0; i < details.length; i++) {
          if (i < 4) {
            allNoticed.push(details[i]);
          }
        }
        this.allNotice = allNoticed;
        this.groupDetails.notice = allNoticed;
        this.comment = '';


        window.scrollTo(0, 860);
        this.noticedMessage = 'Comment Noticed Successfully.';
        setTimeout(() => this.noticedMessage = '', 5000);
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


  isValidFile(ext: string): boolean {

    if (ext != "jpeg" && ext != "jpg" &&
     ext != "png" && ext != "bmp" && ext != "gif"
     &&  ext != "doc" && ext != "docx" && ext != "xls" && ext !='xlsx'
    ) {
      return false;
    }
    return true;
  }

  onFileChange(fileInput) {

    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      this.loader.display(true);
      let file: File = fileList[0];
      console.log(fileList, file);
      console.log(file.name);
      localStorage.setItem('fileName', file.name);
      let fileSize: number = fileList[0].size;

      let fileExtenstion = fileList[0].name.split('.').pop();
      
      //checking the valid file
      if (this.isValidFile(fileExtenstion.toLowerCase())) {
        //500 KB 
        if (fileSize <= 512000) {
          this.formData.append('userImage', file);
          //this.formData.set('userImage', file);
          this.studentService.uploadstudentFiles(this.formData).subscribe((data) => {
            
            if (data.code = '200') {
              var fileName = localStorage.getItem('fileName');
              localStorage.removeItem('fileName');
              var obj = {
                studyGroupId: this.groupId,
                fileName: fileName,
                fileId: data.imageURL
              }

              this.studentService.uploadGroupFiles(obj).subscribe((data) => {
                if (data.code = '200') {
                  
                  var obj={
                    fileName: data.FilesData.fileName,
                    fileId:data.FilesData.fileId,
                    created:data.FilesData.created
                  }
                  this.groupDetails.files.push(obj);
                  this.loader.display(false);
                }
                else {
                  this.loader.display(false);
                  //this.router.navigate(['']);
                }
    
    
              }, error => {
                this.loader
                this.loader.display(false);
                //this.router.navigate(['']);
              });

              this.loader.display(false);
            }
       

            else {
              this.loader.display(false);
              //this.router.navigate(['']);
            }


          }, error => {
          
            this.loader.display(false);
            //this.router.navigate(['']);
          });
        }
        else {
          this.loader.display(false);
           this.invalidFileMessage = 'File size can not be more than 500 kb.';
           setTimeout(() => this.invalidFileMessage = '', 5000);
        }
      }
      else {
        this.loader.display(false);      
        this.invalidFileMessage = 'Please upload a valid file.';
        setTimeout(() => this.invalidFileMessage = '', 5000);
      }
    }

  }


  CreatePracticeRoom(){
     this.router.navigate(['../../../../practice-create/',this.groupId,this.groupDetails.name,this.groupDetails.subject]);
  }

  getLimitedNoticed(notice):string{
    
    if(notice.length>40){
    return notice.substr(0,40) + '...';
    }
    return notice;
  }


  unpostConfirmation(noticeId, index, commentId) {
    this.noticeId = noticeId;
    this.noticeIndex = index;
    this.commentId = commentId;
    $('#unpostNoticed').modal('show');
  }

  unPostNotice() {

    
    this.loader.display(true);
    var unpostNotice = {
      studyGroupId: this.groupId,
      noticeId: this.noticeId,
      commentId: this.commentId
    }

    localStorage.setItem('noticedIndex', this.noticeIndex);
    localStorage.setItem('commentId', this.commentId);



    this.studentService.unPostNotice(unpostNotice).subscribe((data) => {



      if (data.code == '200') {
        //var loggedInId = localStorage.getItem('student-id');


        var index = localStorage.getItem('noticedIndex');
        localStorage.removeItem('noticedIndex');
        this.allNotice.splice(index, 1);

        var commentId = localStorage.getItem('commentId');

        var commentIndex = this.outerComment.findIndex(x => x._id == commentId);

        if (commentIndex >= 0) {
          this.outerComment[commentIndex].isNoticed = 0;
        }

        // localStorage.removeItem('noticedIndex');
        // this.outerComment[index].isNoticed = '1';


        // var details = this.allNotice;
        // this.allNotice = [];
        // var allNoticed = [];
        // allNoticed.push(recentNoticed);

        // for (var i = 0; i < details.length; i++) {
        //   if(i<4){
        //   allNoticed.push(details[i]);
        //   }
        // }
        // this.allNotice = allNoticed;
        // this.groupDetails.notice = allNoticed;
        // this.comment = '';


        // window.scrollTo(0, 860);
        $('#unpostNoticed').modal('hide');
        this.noticedMessage = 'Comment Unnoticed Successfully.';
        setTimeout(() => this.noticedMessage = '', 5000);
        this.loader.display(false);

      } else {

        this.noticedMessage = 'internal error.';
        setTimeout(() => this.noticedMessage = '', 5000);
        this.loader.display(false);
      }
    }, error => {
      
      this.loader.display(false);
      this.router.navigate(['']);
    });
  }


  openInvitePoUp(){
    var obj = {
      openInvitePopup: true,
      studyGroupId: this.groupId
    }
    this.loginPopupService.setValueForLoginPopUp(obj);

  }

}
