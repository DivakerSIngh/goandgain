import { Component, OnInit,Inject,ElementRef } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader';
import { StudentService } from '../../../../../../services/student.service';

import { TeacherService } from '../../../../../../services/teacher.service';

import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { DOCUMENT } from '@angular/platform-browser';

declare var $:any;
@Component({
  selector: 'app-create-study-group',
  templateUrl: './create-study-group.component.html',
  styleUrls: ['./create-study-group.component.css']
})
export class CreateStudyGroupComponent implements OnInit {

  formData: any;
  viewImage: any = "assets/images/image-placeholder.jpg";
  timeZoneList: any = [];
  languages: any = [];
  categoryList: any = [];
  category: any;
  subcategoryList: any = [];
  subcategory: any;
  timeZone: any;
  groupName: string = '';
  subject: string = ''
  language: any;
  invalidImage: boolean = false;
  imageValidationMessage: string = "";
  remainingChar: number = 250;
  Description: string = '';
  participants: string = '';
  friendList: any = [];
  addedParticipants: any = [];
  createGroupStatus: string = '';

  participandLimitReached: boolean = false;
  constructor(
     private loaderService: LoaderService,
     private studentService: StudentService,
     private _location: Location,
     private teacherService:TeacherService,
     private router: Router,
     @Inject(DOCUMENT) private document: any,
    private elementRef:ElementRef) { }



  ngOnInit() {
    this.loaderService.display(true);
    this.timeZone = '0';
    this.language = '0';
    this.participants = '0';
    this.formData = new FormData();
    this.getTimeZone();
    this.getLanguages();
    this.getcategoryAndSubcategories();
    this.getParticipantList();
    this.loaderService.display(false);
    window.scrollTo(0, 0);
  }


  //was trying to use the select2 using jquery
  ngAfterViewInit() {
    var s1 = this.document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"; 
      this.elementRef.nativeElement.appendChild(s1); 
      var element=this.elementRef.nativeElement;
      setTimeout(function() {
       // $('#participantId').select2();
      }, 1000);
  
  $('#participantId').change(function(){
    var data=$('#participantId').val();
    //addParticipantListBySelect2(data);
  })
  
   
  }

  
  // addParticipantListBySelect2(id) {
  //   if (this.addedParticipants.length <= 8) {
  //     this.participandLimitReached = false;
  //     var friend = this.friendList.filter(x => x._id == this.participants);
  //     var ifExist = this.addedParticipants.filter(x => x._id == this.participants);
  //     if (ifExist.length == 0) {
  //       this.addedParticipants.push(friend[0]);

  //     }
  //     //this.friendList=[];
  //     //this.participants='';
  //   } else {
  //     this.participandLimitReached = true;
  //     setTimeout(() => {
  //       this.participandLimitReached = false;
  //     }, 5000);
  //   }
  //  this.participants = '0';
  // //   $event.value = '';
  // var friendList=this.friendList;
  // this.friendList=[];
  //  this.friendList=friendList;
  

  // }

  



  getTextAreacount() {
    this.remainingChar = 250 - this.Description.length;
  }

  // resetForm()

  //form valid or not
  isValid(): boolean {
    if (this.category != 0 && this.subcategory != 0
      //  && this.addedParticipants.length > 0 
       && this.timeZone != 0 && this.groupName.trim() != '' && this.subject.trim() != '' && this.language != 0 && this.Description.trim() != '') {
      return false;
    }
    return true;
  }
  getcategoryAndSubcategories() {
    this.studentService.getStudtGroupCategories().subscribe((data) => {

      if (data.code == '200') {
        this.categoryList = data.dataGrid;
        this.category = 0;
        this.subcategory = 0;
        // var innerData=this.categoryList.filter(x=>x._id==this.category);
        // this.subcategoryList=this.categoryList.filter(x=>x._id==this.category)[0].innerData;
      }
    }, error => {

      // this.isImage = true;
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  changeCatgegory() {
    this.subcategory = 0;
    var innerData = this.categoryList.filter(x => x.name === this.category);
    this.subcategoryList = this.categoryList.filter(x => x.name == this.category)[0].innerData;
  }
  getTimeZone() {
    
    this.studentService.getCountriesAndTimeZone().subscribe((data) => {
      
      if (data.code == '200') {
       
        this.timeZoneList = data.data;
        // if(data.ipInfo!=undefined && data.ipInfo.timezone!=undefined){
        //   this.timeZone =data.ipInfo.timezone;
        // }
      }
    }, error => {
      
      // this.isImage = true;
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  getLanguages() {
    this.studentService.getStudentLanguages().subscribe((data) => {

      if (data.code == '200') {
        this.languages = data.data;
      }
    }, error => {
      // this.isImage = true;
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  //checking the valid image
  isValidImage(ext: string): boolean {
    
    if (ext != "jpeg" && ext != "jpg" && ext != "png" && ext != "bmp" && ext != "gif") {
      return false;
    }
    return true;
  }

  //choose image 
  onFileChange(fileInput) {

    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      this.loaderService.display(true);
      let file: File = fileList[0];
      console.log(fileList, file);
      
      let fileSize: number = fileList[0].size;
      let fileExtenstion = fileList[0].name.split('.').pop();
      if (this.isValidImage(fileExtenstion.toLowerCase())) {
        //500 KB
        if (fileSize <= 512000) {
          // this.formData.set('userImage', file);
          this.formData.delete('userImage');
          this.formData.append('userImage', file);
          this.studentService.uploadstudentFiles(this.formData).subscribe((data) => {
            if (data.code == '200') {
              this.viewImage = data.imageURL;
              this.imageValidationMessage = '';
              this.invalidImage = false;
              this.loaderService.display(false);
            }
            else {
              this.loaderService.display(false);
              this.invalidImage = true;
              this.imageValidationMessage = 'There is some internal error.';
              var error = setTimeout(() => {
                this.invalidImage = false;

              }, 5000);
            }
          }, error => {
            this.loaderService.display(false);
            this.invalidImage = true;
            this.imageValidationMessage = 'There is some internal error.';
            var internalError = setTimeout(() => {
              this.invalidImage = false;

            }, 5000);
          });
        }
        else {
          this.loaderService.display(false);
          this.invalidImage = true;
          this.imageValidationMessage = 'File size can not be more than 500 kb.';
          var moreSize = setTimeout(() => {
            this.invalidImage = false;

          }, 5000);
        }
      }
      else {
        this.imageValidationMessage = 'Please upload a valid image.';
        this.loaderService.display(false);
        this.invalidImage = true;
        var invalidImage = setTimeout(() => {
          this.invalidImage = false;

        }, 5000);
      }
    }

  }

  createStudyGroup(event) {

    var timezone = this.timeZoneList.filter(x => x.name == this.timeZone);

    var studentId = [];
    for (var i = 0; i < this.addedParticipants.length; i++) {
      studentId.push(this.addedParticipants[i]._id);
    }
    var obj = {
      name: this.groupName.trim(),
      image: this.viewImage,
      categoryId: this.category,
      country: this.timeZone,
      timeZone: timezone[0].offsetStr,
      subject: this.subject.trim(),
      language: this.language,
      description: this.Description.trim(),
      membersId: studentId,
      subCategory: this.subcategory
    }


    this.studentService.createStudyGroup(obj).subscribe((data) => {

      if (data.code == '200') {
        this.createGroupStatus = 'Study Group created Successfully.';

        // this.viewImage = "./assets/images/avtar.png";
        // this.category='0';
        // this.subcategory='0';
        // this.timeZone='0';
        // this.groupName='';
        // this.subject='';
        // this.participants='0';
        // this.language='0';
        // this.Description='';
        // this.participants = '0';
        //this.addedParticipants=[];
        this.loaderService.display(true);
        var removeMessag = setTimeout(() => {
          this.createGroupStatus = '';

        }, 4000);
        this.router.navigate(['../student/student-profile/friends-group/group-details/' + data.data]);
      }
      else if(data.code=='401') {
        this.loaderService.display(false);
        this.invalidImage = true;
        this.createGroupStatus = data.message;
        setTimeout(() => {
          this.createGroupStatus = '';

        }, 5000);
      }
    }, error => {
      
      this.loaderService.display(false);
      this.invalidImage = true;
      this.createGroupStatus = 'There is some internal error.';
     setTimeout(() => {
        this.createGroupStatus='';
      }, 5000);
    });

  }

  resetForm() {
    this._location.back();
    this.groupName = '';
    this.viewImage = "./assets/images/avtar.png";
    this.category = '0';
    this.timeZone = '0',
    this.subject = '',
    this.language = '0',
    this.Description = '';
    this.subcategory = '';
    this.addedParticipants = [];
    this.remainingChar = 250;
  }
  getParticipantList() {
    // if(this.participants.length>3){
    this.studentService.getStudentFriendForCreatingStudyGroup().subscribe((data) => {
     
      if (data.code == '200') {
        this.friendList = data.data;
      }
    }, error => {
      
      // this.isImage = true;
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
    // }
  }

  addParticipantList($event) {
    
    if (this.addedParticipants.length <= 8) {
      this.participandLimitReached = false;
      var friend = this.friendList.filter(x => x._id == this.participants);
      var ifExist = this.addedParticipants.filter(x => x._id == this.participants);
      if (ifExist.length == 0) {
        this.addedParticipants.push(friend[0]);

      }
      //this.friendList=[];
      //this.participants='';
    } else {
      this.participandLimitReached = true;
      setTimeout(() => {
        this.participandLimitReached = false;
      }, 5000);
    }
   this.participants = '0';
  //   $event.value = '';
  var friendList=this.friendList;
  this.friendList=[];
   this.friendList=friendList;
   $event.source.value ='0';

  }
  removeFromList(index) {
    this.addedParticipants.splice(index, 1);
    this.participants = '0';
  }


  validFileStatus:string='';
  updateFile(fileInput) {
   
      let fileList: FileList = fileInput.target.files;
      if (fileList.length > 0) {
        this.loaderService.display(true);
        let file: File = fileList[0];
        console.log(fileList, file);

        let fileSize: number = fileList[0].size;

        let fileExtenstion = fileList[0].name.split('.').pop();
      //  if (this.isValidFile(fileExtenstion.toLowerCase())) {
          //1 MB
          if (fileSize <= 1024000) {

            
            this.formData.append('userImage', file);
            //this.formData.set('userImage', file);


            //file.name
            localStorage.setItem('fileName', file.name);
            this.teacherService.uploadTeacherProfileImage(this.formData).subscribe((data) => {
             
              if (data.code == '200') {
                this.loaderService.display(false);
              }
              else {
                this.validFileStatus = 'There is some internal error.';
                // this.isImage = false;
                // this.loaderService.display(false);   
                //this.router.navigate(['']);
              }


            }, error => {
              // validFileStatus
              
              
              this.loaderService.display(false);
              console.log(error.code);
              //this.router.navigate(['']);
            });

          }
          else {
            this.loaderService.display(false);
            this.validFileStatus = 'File size can not be more than 1 MB.';
          }
        // } else {
        //   this.loaderService.display(false);
        //  // this.validFileStatus = "You can upload only pdf, doc, docx, xlsx, xls, jpg, jpeg, png.";
        //  this.validFileStatus = "Please upload a valid file.";
         
        // }
      }

  }


}
