import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService} from '../../../../../../services/student.service';
import {LoaderService} from '../../../../../../modules/shared/loader';
import { LoginHeaderService } from '../../../../../../services/login-header.service';

declare var $: any;

@Component({
  selector: 'app-bulletin-comments',
  templateUrl: './bulletin-comments.component.html',
  styleUrls: ['./bulletin-comments.component.css']
})
export class BulletinCommentsComponent implements OnInit {

  bulletinId: string = '';
  bulletinDetails:any;
  allComment:any;


  isLoggedIn: boolean = false;

  userFullName :string='';
  firstName :string='';
  lastName :string='';
  studetnImage :string='';

  innerComment:string='';

  comment:string='';

  deleteCommentId :string='';
  deleteCommentIndex :string='';
  isOuterCommentForDelete :boolean;

  editCommentId:string='';
  editCommentIndex:string='';

  deleteInnerCommentId :string;
 deleteinnerCommentIndex :string;
 deleteOuterCommentIndex :string;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private studentService:StudentService,
    private loaderService:LoaderService,
    private loginHeaderService: LoginHeaderService
  ) { }

  ngOnInit() {





    this.loaderService.display(true);
    this.bulletinId = this.route.snapshot.paramMap.get("id");



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


    this.getBulletinDetails(this.bulletinId);
 
  }

  getBulletinDetails(bulletinId){
    this.studentService.getSingleBulletinBoardDetails(bulletinId).subscribe((data) => {

      if (data.code == '200') {
        
        this.bulletinDetails = data.Bulletin;
        this.allComment=this.bulletinDetails.comment;

        this.loaderService.display(false);
 
      } else {

        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
        this.loaderService.display(false);
        this.router.navigate(['']);
    });
  }

  isEntered(): boolean {
    if (this.comment != '') {
      return false;
    }
    return true;
  }

  postComment() {
  
    this.loaderService.display(true);
    var obj = {
      bulletinId: this.bulletinId,
      comment: this.comment
    }

    this.studentService.postBulletinBoardComment(obj).subscribe((data) => {
      
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
        
        var details = this.bulletinDetails.comment;
        this.bulletinDetails.comment = [];
        var allComment = [];
        allComment.push(recentComment);

        for (var i = 0; i < details.length; i++) {
          allComment.push(details[i]);
        }
        this.allComment = allComment;
        this.bulletinDetails.comment = allComment;
        this.comment = '';
        this.loaderService.display(false);
      } else {
        
        this.router.navigate(['']);
      }
    }, error => {
      
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  }
  isMainCommentCreator(indexofComment): boolean {
    var creatorId = this.allComment[indexofComment].userId._id;
    var loggedInId = localStorage.getItem('student-id');
    if (creatorId == loggedInId) {
      return true;
    }
    else {
      return false;
    }
  }

  isInnerCommentInserted(): boolean {
    if (this.innerComment != '') {
      return false;
    }
    return true;
  }


  ConfirmCommentDelete(commentId, index) {
    
        $('.collapse').collapse('hide');
        this.deleteCommentId = commentId
        this.deleteCommentIndex = index;
        this.isOuterCommentForDelete = true;
        $('#deletePopUp').modal('show');
      }



      deleteComment() {
        
        this.loaderService.display(true);
        if (this.isOuterCommentForDelete) {
          localStorage.setItem('deleteCommentIndex', this.deleteCommentIndex);
          this.studentService.deleteBulletinBoardComment(this.deleteCommentId, this.bulletinId).subscribe((data) => {

            if (data.code == '200') {
              
              var removeIndex = localStorage.getItem('deleteCommentIndex');
              this.allComment.splice(removeIndex, 1);
              $('#deletePopUp').modal('hide');
              localStorage.removeItem('deleteCommentIndex');
              this.loaderService.display(false);
            } else {
              
              this.router.navigate(['']);
              this.loaderService.display(false);
            }
          }, error => {
            
            this.loaderService.display(false);
            this.router.navigate(['']);
          });
    
        }
        else {
    
          localStorage.setItem('deleteinnerCommentIndex', this.deleteinnerCommentIndex);
          localStorage.setItem('deleteOuterCommentIndex', this.deleteOuterCommentIndex);
          this.studentService.deleteBulletinBoardInnerComment(this.deleteInnerCommentId, this.deleteCommentId, this.bulletinId).subscribe((data) => {
    
            if (data.code == '200') {
              var removeParentIndex = localStorage.getItem('deleteOuterCommentIndex');
              var removeIndex = localStorage.getItem('deleteinnerCommentIndex');
              localStorage.removeItem('deleteOuterCommentIndex');
              localStorage.removeItem('deleteinnerCommentIndex');
              this.allComment[removeParentIndex].replyData.splice(removeIndex, 1);
              $('#deletePopUp').modal('hide');
              this.loaderService.display(false);
            } else {
              this.loaderService.display(false);
              this.router.navigate(['']);
            }
          }, error => {
    
            this.loaderService.display(false);
            this.router.navigate(['']);
          });
        }
      }

      openCloseCollapsEditMainComment(thisId,thisIndex,message){
        this.innerComment = message;
        this.editCommentId=thisId;
        this.editCommentIndex=thisIndex;
        $('.collapse').collapse('hide');
        $('#' + thisIndex).collapse('show');
      }
      openCloseCollaps(id) {
        this.innerComment = '';
        $('.collapse').collapse('hide');
        $('#' + id).collapse('show');
      }


      SaveInnerComment(comment, commentId, outerIndex) {
        
            localStorage.setItem('outerIndex', outerIndex);
        
            this.loaderService.display(true);
            var obj = {
              bulletinId: this.bulletinId,
              comment: comment,
              messageId: commentId
            }
        
            this.studentService.postBulletinBoardInnerComment(obj).subscribe((data) => {
             
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
              var allOldInnerComment = this.bulletinDetails.comment[outerIndex].replyData;
                this.bulletinDetails.comment[outerIndex].replyData = [];
              var allComment = [];
              allComment.push(recentInnerComment);
                for (var i = 0; i < allOldInnerComment.length; i++) {
                  allComment.push(allOldInnerComment[i]);
                }
                // this.outerComment = allComment;
                this.bulletinDetails.comment[outerIndex].replyData = allComment;
                this.comment = '';
                $('.collapse').collapse('hide');
                this.loaderService.display(false);
        
              } else {
                
                this.router.navigate(['']);
                this.loaderService.display(false);
              }
            }, error => {
            
              this.loaderService.display(false);
              this.router.navigate(['']);
            });
          }


          imageManualPath:string='assets/images/image-placeholder.jpg';
          editMainComment(comment,thisId,index){
            
                this.loaderService.display(true);
                var obj = {
                  bulletinId: this.bulletinId,
                  comment: comment,
                  messageId: thisId
                }
                localStorage.setItem('editIndex',index);
                localStorage.setItem('editedMessage',comment);
              
                this.studentService.editBulletinBoardComment(obj).subscribe((data) => {
                  
                  var index = localStorage.getItem('editIndex');
                  var editedMessage = localStorage.getItem('editedMessage');
                  if (data.code == '200') {
                    
                    this.bulletinDetails.comment[index].comment=  editedMessage;
                    
                    
                    this.comment = '';
                    $('.collapse').collapse('hide');
                    this.loaderService.display(false);
            
                  } else {
                    
                    this.loaderService.display(false);
                    this.router.navigate(['']);
                  }
                }, error => {
                  
                  this.loaderService.display(false);
                  this.router.navigate(['']);
                });
          }

          isInnerCommentCreator(indexOfOuterComment, indexOfInnerComment): boolean {
            
            var creatorId = this.allComment[indexOfOuterComment].replyData[indexOfInnerComment].userId._id;
            var loggedInId = localStorage.getItem('student-id');
            if (creatorId == loggedInId) {
              return true;
            }
            else {
              return false;
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
              getCategoryName(categoryId):string{
                if(categoryId=='1')
                {
                  return 'Free Discussion';
                }
                else if(categoryId=='2')
                {
                  return 'Essay Correction';
                }
                else if(categoryId=='3')
                {
                  return 'Question & Answer';
                }
        
              }

              // checkUrl(){
              //   this.studentService.testingUrlFetching().subscribe((data) => {
              //     
              //           if (data.code == '200') {
              //             this.bulletinDetails = data.Bulletin;
                  
              //             this.allComment=this.bulletinDetails.comment;
                  
                          
                   
              //           } else {
              //             
              //             this.loaderService.display(false);
              //             this.router.navigate(['']);
              //           }
              //         }, error => {
              //          
              //             this.loaderService.display(false);
              //           this.router.navigate(['']);
              //         });
              // }


              getImage(image):string{
                
               if(image!=undefined && image!=''){
            
                if(this.isValidImage(image.split('.').pop().toLowerCase()))
                {
                  return image;
                }
            
                return this.imageManualPath;
               }
               return this.imageManualPath;
              }
            
              isValidImage(ext: string): boolean {
                if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
                  return false;
                }
                return true;
              }

}
