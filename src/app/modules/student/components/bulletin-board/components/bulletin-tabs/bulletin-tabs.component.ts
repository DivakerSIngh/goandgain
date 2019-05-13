import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'

import { StudentService } from '../../../../../../services/student.service';

import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-bulletin-tabs',
  templateUrl: './bulletin-tabs.component.html',
  styleUrls: ['./bulletin-tabs.component.css']
})
export class BulletinTabsComponent implements OnInit {

  currentCategory: string = '';
  constructor(private loaderService: LoaderService, 
    private studentService: StudentService,
    private router: Router,
  private loginPopupService:LoginPopupService) { }

  ngOnInit() {
    //category 0 for all
    this.currentCategory = '0';


    this.getBulletinBoard(this.currentCategory);
  }
  getBulletinBoard(currentCategory): void {
    this.currentCategory = currentCategory;

    this.loaderService.display(true);
    var getBulletingBoard = {
      searchKey: '',
      limt: '0',
      sortKey: 'created',
      sortType: '1',
      category: currentCategory,
      language: ''
    }
    this.studentService.getallBulletinBoard(getBulletingBoard).subscribe((data) => {
    
      var setBulletinBoard={
        isBulletinBoard:true,
        BulletinBoardDetails:data,
        currentCategory:this.currentCategory
      }
     this.loginPopupService.setValueForLoginPopUp(setBulletinBoard);
     this.loaderService.display(false);
    }, error => {
    
      this.loaderService.display(false);
      this.router.navigate(['']);
    });

  }

}
