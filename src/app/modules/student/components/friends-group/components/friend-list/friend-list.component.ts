import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoaderService } from '../../../../../../modules/shared/loader'
//import { LoginPopupComponent } from '../../../../../../login-popup/login-popup.component'
//import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';
//import { LoginHeaderService } from '../../../../../../services/login-header.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  search:string='';
  myFriends:any[];
  limit:number=0;
  norecordFound:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    // private commanService: CommanService,
    private router: Router
    //private loginPopupService: LoginPopupService,
    //public dialog: MatDialog,
    //private loginHeaderService: LoginHeaderService
  ){
  }


  ngOnInit() {
    this.loader.display(true);

    this.getMyFriends(this.search,this.limit);
   
  }

  inviteFriends(){
    this.router.navigate(['../student/student-profile/friends-group/invite-friend/']);
 }

  searchFriends(event){
  if (event.keyCode == 13) {
    this.limit=0;
    this.loader.display(true);
    this.getMyFriends(this.search, this.limit);
  }
  }
  getMyFriends(search,limit){

      this.studentService.searchConnectedFriend(this.search,this.limit).subscribe((data) => {  
            
        if (data.code == '200') {   
          
            this.myFriends = data.data;
            this.norecordFound=false;
          } else {
            this.norecordFound=true;
            this.myFriends = [];
            //this.router.navigate(['']);
          }         
          this.loader.display(false);
       
        }, error => {          
          
          this.loader.display(false);
          this.norecordFound=true;
          this.myFriends=[];
        //   if (error.code == 501) {
     //   this.router.navigate(['']);
        // }
      });
    };

}
