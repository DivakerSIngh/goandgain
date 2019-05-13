import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../../../services/student.service'

import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../../../modules/shared/loader';
@Component({
  selector: 'app-bulletin-hot',
  templateUrl: './bulletin-hot.component.html',
  styleUrls: ['./bulletin-hot.component.css']
})
export class BulletinHotComponent implements OnInit {

  isLoggedIn: boolean;
  languageList: any = [];
  language: string = '0';
  search: string = '';
  bulletinboardDetails: any = []
  noBulletinFound: boolean = false;
  currentCategory: any;
  imageManualPath:string='assets/images/image-placeholder.jpg';
  constructor(private studentService: StudentService,
    private loaderService: LoaderService, private router: Router,
    private loginPopupService: LoginPopupService) { }

  ngOnInit() {
    if (this.studentService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    this.loginPopupService.bs.subscribe((val: any) => {

      if (val.isBulletinBoard != undefined || val.isBulletinBoard == true && val.BulletinBoardDetails != undefined && val.currentCategory != undefined) {
        if (val.BulletinBoardDetails.code == '200') {

          this.noBulletinFound = false;
          this.bulletinboardDetails = val.BulletinBoardDetails.Bulletin;
          
          this.currentCategory = val.currentCategory;
          this.loaderService.display(false);
        } else if (val.BulletinBoardDetails.code == '404') {
          this.noBulletinFound = true;
          this.bulletinboardDetails = [];
          this.currentCategory = val.currentCategory;
          this.loaderService.display(false);
        }
      }
    });


    this.getLanguge();
  }

  getLimitedDesciption(description): string {
    if (description.length > 170) {
      return description.substr(0, 170) + '...';
    }
    return description;
  }


  getLanguge() {
    this.studentService.getStudentLanguages().subscribe((data) => {

      if (data.code == '200') {
        this.languageList = data.data;
      } else {
        //this.router.navigate(['']);
      }
    }, error => {
      this.loaderService.display(false);
      //this.router.navigate(['']);
    });
  }
  ifSelected(): boolean {
    // if(this.search!=''){
    // return false;
    // }
    // return true;
    return false;
  }


  resetSearch(): void {
    var language = '';
    this.language = '0';
    this.search = '';
    this.loaderService.display(true);
    var getBulletingBoard = {
      searchKey: this.search,
      limt: '0',
      sortKey: 'created',
      sortType: '1',
      category: this.currentCategory,
      language: ''
    }
    this.studentService.getallBulletinBoard(getBulletingBoard).subscribe((data) => {
      var setBulletinBoard = {
        isBulletinBoard: true,
        BulletinBoardDetails: data,
        currentCategory: this.currentCategory
      }
      this.loginPopupService.setValueForLoginPopUp(setBulletinBoard);
      this.loaderService.display(false);
    }, error => {
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  }
  getBulletinBoard(): void {

    var language = '';
    if (this.language != '0') {
      language = this.language;
    }
    this.loaderService.display(true);
    var getBulletingBoard = {
      searchKey: this.search,
      limt: '0',
      sortKey: 'created',
      sortType: '1',
      category: this.currentCategory,
      language: language
    }
    this.studentService.getallBulletinBoard(getBulletingBoard).subscribe((data) => {

      var setBulletinBoard = {
        isBulletinBoard: true,
        BulletinBoardDetails: data,
        currentCategory: this.currentCategory
      }
      this.loginPopupService.setValueForLoginPopUp(setBulletinBoard);
      this.loaderService.display(false);
    }, error => {

      this.loaderService.display(false);
      this.router.navigate(['']);
    });

  }

  getCategoryName(categoryId): string {
    if (categoryId == '1') {
      return 'Free Discussion';
    }
    else if (categoryId == '2') {
      return 'Essay Correction';
    }
    else if (categoryId == '3') {
      return 'Question & Answer';
    }

  }


  isHot(board): boolean {
  
    let endDate = new Date();
    let startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    var createdDate= new Date(board.created);
    console.log(startDate,createdDate,typeof startDate, typeof createdDate,createdDate.getTime() < startDate.getTime())
    if ((createdDate.getTime() > startDate.getTime()) && (createdDate.getTime() < endDate.getTime()) &&( board.weightage >= 150)) {
      return true;
    }
    return false
  }

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
