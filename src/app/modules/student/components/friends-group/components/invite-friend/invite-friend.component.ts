import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../../../services/student.service';




@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit {

  search: string = '';
  limit: number = 0;
  searchFriendList: any = [];
  isMoreData: boolean = false;
  norecordFound: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    // private commanService: CommanService,
    private router: Router
    //private loginPopupService: LoginPopupService,
    //public dialog: MatDialog,
    //private loginHeaderService: LoginHeaderService
  ) {
  }

  ngOnInit() {
    this.loader.display(true);
    this.limit = 0;
    console.log(this.search)
    this.GetsearchFriendList(this.search, this.limit);

  }

  GetsearchFriendList(friendName, number) {

    this.studentService.inviteFriends(this.search, number).subscribe((data) => {

      if (data.code == '200') {
        
        var limit=this.limit;
        this.norecordFound = false;
        if(limit>0){
          for(var i=0;i<data.data.length;i++){
            this.searchFriendList.push(data.data[i]);
          }
        }
        else{
          this.searchFriendList=data.data;
        //this.searchFriendList.push(data.data);
        }

        if (data.next == 'yes') {

          this.isMoreData = true;
        }
        else {

          this.isMoreData = false;
        }
      } else if (data.code = '404') {
        this.isMoreData = false;
        this.norecordFound = true;
        this.searchFriendList = [];


        //this.router.navigate(['']);
      }
      this.loader.display(false);

    }, error => {
      
      //   if (error.code == 400) {
      //   this.router.navigate(['']);
      // }
    });
  };


  loadMoreData() {
    this.limit += 10;
    this.loader.display(true);
    this.GetsearchFriendList(this.search, this.limit);

  }


  searchFriends(event) {
    if (event == undefined || event.keyCode == 13) {
      this.limit=0;
      this.loader.display(true);
      this.GetsearchFriendList(this.search, this.limit);
    }
  }






  accepteFriend(friendId: string, index: any):void{
    this.loader.display(true);
    
    localStorage.setItem('indexOfrequestFriend',index);
    this.studentService.acceptFriendRequest(friendId).subscribe((data) => {   
         
            if (data.code == '200') {
              var index = localStorage.getItem('indexOfrequestFriend');
              localStorage.removeItem('indexOfrequestFriend');
              
              if(index!=null){
                this.searchFriendList.splice(index,1);
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







  
  followTeacher(friendId: string, index: any,conType:number): void {
    this.loader.display(true);
    localStorage.setItem('indexOfrequestFriend',index);
    this.studentService.sendFriendRequest(friendId,conType).subscribe((data) => {      
        
      if (data.code == '200') {
              var index = localStorage.getItem('indexOfrequestFriend');
              localStorage.removeItem('indexOfrequestFriend');
              if(index!=null){
                this.searchFriendList[index].follow=1;
                // index]['frdReqStatus']='0';
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
  


  sendFriendRequest(friendId: string, index: any,conType:number): void {
    this.loader.display(true);
    localStorage.setItem('indexOfrequestFriend',index);
    this.studentService.sendFriendRequest(friendId,conType).subscribe((data) => {      
         
      if (data.code == '200') {
              var index = localStorage.getItem('indexOfrequestFriend');
              localStorage.removeItem('indexOfrequestFriend');
              if(index!=null){
                this.searchFriendList[index]['frdReqStatus']='0';
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
  roleOfFriend(role): string {
    if (role == '4') {
      return 'Student';
    }
    else if (role == '3') {
      return 'Teacher';
    }
  }

}
