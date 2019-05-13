import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../../../services/student.service';

declare var $:any;
@Component({
  selector: 'app-owner-group',
  templateUrl: './owner-group.component.html',
  styleUrls: ['./owner-group.component.css']
})
export class OwnerGroupComponent implements OnInit {

  pendingRequest: any = [];
  ifNoRecordFound: boolean = false;
  constructor(private studentService: StudentService, private loader: LoaderService) { }

  ngOnInit() {
    this.loader.display(true);
    this.getPendingList();
  }
  getPendingList() {
    this.studentService.pendingMyGroupRequest().subscribe((data) => {

      if (data.code == '200') {
        this.ifNoRecordFound = false;
        this.pendingRequest = data.data;
      }
      else {
        this.ifNoRecordFound = true;
        //this.searchFriendList.push(data.data);
      }
      this.loader.display(false);

    }, error => {
      this.ifNoRecordFound = false;
      this.loader.display(false);
      //   if (error.code == 400) {
      //   this.router.navigate(['']);
      // }
    });

    
  };


  groupId:any;
  requestId:any;
  index:any;
  action:any;
openConfirmpopUp(groupId,requestId,index,action){
  
  this.groupId=groupId;
  this.requestId=requestId;
  this.index=index;
  this.action=action;
  $('#declineRequest').modal('show');
}

confirmDecline(){
  this.loader.display(true);
  this.responseOnRequest(this.groupId,this.requestId,this.index,this.action)
}

  responseOnRequest(groupId,requestId,index,action){
   //alert(groupId+','+requestId +','+index+','+action)
   localStorage.setItem('requestIndex',index);
   if(action==1){
   this.studentService.acceptGroupRequest(requestId,groupId).subscribe((data) => {
    
    if (data.code == '200') {
      var index = localStorage.getItem('requestIndex');
      localStorage.removeItem('requestIndex');
      if (index != null) {
        this.pendingRequest.splice(index, 1);
        if(this.pendingRequest.length==0){
          this.ifNoRecordFound=true;
        }
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
  else if(action==0){
    this.studentService.DeclineGroupRequest(requestId,groupId).subscribe((data) => {
      
      if (data.code == '200') {
        var index = localStorage.getItem('requestIndex');
        localStorage.removeItem('requestIndex');
        if (index != null) {
          this.pendingRequest.splice(index, 1);
          if(this.pendingRequest.length==0){
            this.ifNoRecordFound=true;
          }
          $('#declineRequest').modal('hide');
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
}
