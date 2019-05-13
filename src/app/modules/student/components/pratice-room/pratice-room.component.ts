import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { LoaderService } from '../../../shared/loader';
import { StudentService } from '../../../../services/student.service';
import { LoginPopupService } from '../../../../services/login-popup.service';



import { ActivatedRoute, Router } from '@angular/router';



declare var $: any;

@Component({
  selector: 'app-pratice-room',
  templateUrl: './pratice-room.component.html',
  styleUrls: ['./pratice-room.component.css']
})
export class PraticeRoomComponent implements OnInit {

  allPracticeRooms: any = [];
  languageList: any = [];
  praticeLanguage: string = '0';
  search: string = '';
  limit = 0;
  isMoreData: boolean = false;
  isLoggedIn: boolean = false;

  //for showing confirmation popup
  isRoomFull: boolean = false;
  isGroupMember: boolean = true;
  isPasswordRequired: boolean = false;
  //for showing confirmation popup


  constructor(private route: ActivatedRoute,
    private loaderService: LoaderService,
    private studentService: StudentService,
    private router: Router,
    private loginPopupService: LoginPopupService) { }

  ngOnInit() {

   

    if (this.studentService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    this.loaderService.display(true);
    this.getLanguages();
    this.GetAllPracticeRoom(this.praticeLanguage, this.search, this.limit);
    var practiceRoomId = this.route.snapshot.paramMap.get("id");
  if(practiceRoomId!=null){
   
    setTimeout(() => {
      this.JoinPracticeRoom(practiceRoomId);
    }, 2000);
   
  }
  }
  GetAllPracticeRoom(language, search, limit) {
    this.studentService.GetAllPracticeRoom(language, search, limit).subscribe((data) => {
      
      if (data.code == '200') {

        if (this.limit == 0) {
          this.allPracticeRooms = data.data;
        }
        else {
          for (var i = 0; i < data.data.length; i++) {
            this.allPracticeRooms.push(data.data[i]);
          }
        }

        
        if (data.next == 'no') {
          this.isMoreData = false;
        }
        else {
          this.isMoreData = true;
        }
      }
      else if (data.code == '404') {
        //data not found
        this.isMoreData = false;
        this.allPracticeRooms = [];
      }
      this.loaderService.display(false);
    }, error => {
      
      this.loaderService.display(false);
      this.allPracticeRooms = [];
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }


  getLanguages() {
    this.studentService.getStudentLanguages().subscribe((data) => {
      if (data.code == '200') {
        this.languageList = data.data;
      }
    }, error => {
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  searchPractice() {
    this.limit = 0;
    this.loaderService.display(true);
    this.GetAllPracticeRoom(this.praticeLanguage, this.search, this.limit);
  }

  ShowMore() {
    
    this.loaderService.display(true);
    this.limit = this.limit + 1;
    this.GetAllPracticeRoom(this.praticeLanguage, this.search, this.limit);
  }
  JoinPracticeRoom(practiceId) {

    var practiceFullDetails = this.allPracticeRooms.filter(x => x._id == practiceId)[0];
    //if user is already login
    if (this.studentService.isLoggedIn()) {
      var practiceType = practiceFullDetails.type;
      
      //if room is not full

      if (practiceFullDetails.members.length != practiceFullDetails.maxParticipation) {

        // Practice type "0 for public" & "1 for private", "2 for Associated Group"

        if (practiceType === 0) {
          //if room is public
          this.router.navigate(['../join-practice-room/', practiceId]);

        }
        else if (practiceType === 1) {
          this.isRoomFull = false;
          this.isGroupMember = true;
          this.isPasswordRequired = true;
          $('#JoinGroupPopUp').modal('show');

        }
        else if (practiceType === 2) {
          //if room is associated from Group
          if (practiceFullDetails.associatedSdyGrpId != undefined) {
            var allMemberOfGroup = practiceFullDetails.associatedSdyGrpId.members || null;
            if (allMemberOfGroup != null) {
              let loggedIndId = localStorage.getItem('student-id');
              
              var isGroupMember = allMemberOfGroup.filter(x => x.userId == loggedIndId && x.memberStatus == 1);
              if (isGroupMember.length > 0) {
                //redirect user here
                this.router.navigate(['../join-practice-room/', practiceId]);
              }
              else {
                //user is not a member of group
                //message -:Sorry, this room is associated with study group.
                this.isRoomFull = false;
                this.isGroupMember = false;
                this.isPasswordRequired = false;
                $('#JoinGroupPopUp').modal('show');
              }
            }

          }
        }
      }
      else {
        this.isRoomFull = true;
        this.isGroupMember = true;
        this.isPasswordRequired = false;
        $('#JoinGroupPopUp').modal('show');
      }
    }
    else {
      //open the login popup
      var obj = {
        redirectToPracticeRoom: true,
        url:'../practice-room/'+practiceId
      }
      this.loginPopupService.setValueForLoginPopUp(obj);
    }
    //url: '../join-practice-room/' + practiceId_
    //this is commented code
    // var studentDetails = localStorage.getItem('student-details') || null;
    // if (studentDetails != null) {
    //   this.loginHeaderService.setLoginValue(JSON.parse(studentDetails));
    // }




    //alert(practiceId);
    //this.router.navigate(['']);


  }

}
