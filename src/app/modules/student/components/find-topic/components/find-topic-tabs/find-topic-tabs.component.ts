
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'

import { StudentService } from '../../../../../../services/student.service';

import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find-topic-tabs',
  templateUrl: './find-topic-tabs.component.html',
  styleUrls: ['./find-topic-tabs.component.css']
})
export class FindTopicTabsComponent implements OnInit {

  currentCategory:string='';
  categoryList:any=[];
  category :any;
  subCategoryList:any=[];
  subCategory:any;
  constructor(private loaderService: LoaderService, 
    private studentService: StudentService,
    private router: Router,
    private loginPopupService:LoginPopupService) {
   
   }

  ngOnInit() {
    this.currentCategory = '1';
    this.subCategory='0';
    this.getcategoryAndSubcategories();
   
  }
  getcategoryAndSubcategories() {
    this.studentService.getStudtGroupCategories().subscribe((data) => {
      if (data.code == '200') {
        this.categoryList = data.dataGrid;
        this.category = 0;
        this.findTopic(this.currentCategory);
      }
    }, error => {
    
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }

  


  findTopic(currentCategory){
    this.currentCategory = currentCategory;
    this.loaderService.display(true);
    var getTopic = {
      searchKey: '',
      limit: '0',
      sortKey: 'created',
      sortType: '1',
      category: currentCategory,
      language: '',
      subCategory:'0'
    }
    this.studentService.findTopic(getTopic).subscribe((data) => {
     
    
     
      this.subCategoryList = this.categoryList.filter(x => x._id == this.currentCategory)[0].innerData;
      var setFindTopics={
        isFindTopic:true,
        findTopicData:data,
        findTopicCategory:this.currentCategory,
        findSubCategory:this.subCategory,
        findTopicSubcategoryList:this.subCategoryList
      }
     this.loginPopupService.setValueForLoginPopUp(setFindTopics);
     this.loaderService.display(false);
    }, error => {
    
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  }

}
