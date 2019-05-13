import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../../../../../services/student.service';
import { LoaderService } from '../../../../../../modules/shared/loader';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(private studentService: StudentService, private loaderService: LoaderService, private router: Router, ) { }


  search: string = '';
  limit: number = 0;
  sortKey: string = 'created';
  sortType: number = 1;
  myGroups: any = [];
  loggedInId: string = '';
  noRecordFound: boolean = false;



  ngOnInit() {



    this.loaderService.display(true);
    this.loggedInId = localStorage.getItem('student-id') || null;
    this.getMyGroupList(this.search, this.limit, this.sortKey, this.sortType, this.loggedInId);

  }

  getMemberCount(memberList): number {
    
    var count = 0;
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].memberStatus == '1') {
        count++;
      }
    }
    return count;
  }
  getMyGroupList(search, limit, sortKey, sortType, userId): void {
    this.studentService.findMyStudyGroups(search, limit, sortKey, sortType, userId).subscribe((data) => {

      if (data.code == '200') {
        this.myGroups = data.groups;
        this.noRecordFound = false;

      } else {
        this.myGroups = [];
        this.noRecordFound = true;
        // this.router.navigate(['']);
      }
      this.loaderService.display(false);
    }, error => {
      
      this.loaderService.display(false);
      // this.router.navigate(['']);
    });
  }

  isAdmin(creatorId): boolean {
    var loggedInUser = localStorage.getItem('student-id');
    if (creatorId === loggedInUser) {
      return true;
    }
    return false;
  }

  resetSearch() {
    this.loaderService.display(true);
    this.search = '';
    this.limit = 0;
    this.sortKey = 'created';
    this.sortType = 1;


    this.getMyGroupList(this.search, this.limit, this.sortKey, this.sortType, this.loggedInId);
    this.loaderService.display(false);
  }


  searchGroups() {
    if (this.search != '') {
      this.loaderService.display(true);
      this.getMyGroupList(this.search, this.limit, this.sortKey, this.sortType, this.loggedInId);
      this.loaderService.display(false);
    }
  }
}
