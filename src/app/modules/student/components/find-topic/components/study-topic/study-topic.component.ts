import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../../../services/student.service'

import { LoginPopupService } from '../../../../../../services/login-popup.service';

import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../../../modules/shared/loader';


declare var $: any;
@Component({
  selector: 'app-study-topic',
  templateUrl: './study-topic.component.html',
  styleUrls: ['./study-topic.component.css']
})
export class StudyTopicComponent implements OnInit {

  languageList: any = [];
  findTopicDetails: any = [];
  currentCategory: string = '';
  noTopicFound: boolean;
  isLoggedIn: boolean = false;
  selectedTopicTitle: any;
  selectedTopicImage: any;
  selectedtopicDescription: any;
  topicSubcategoryList: any = [];
  topicSubCategory: any;
  language: any=0;
  constructor(private studentService: StudentService,
    private loaderService: LoaderService, private router: Router,
    private loginPopupService: LoginPopupService) { }

  ngOnInit() {
    this.getLanguge();
    this.topicSubCategory = 0;
    this.language = 0;
    if (this.studentService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }

    this.loginPopupService.bs.subscribe((val: any) => {
      
      if (val.isFindTopic != undefined || val.isFindTopic == true && val.findTopicData != undefined && val.findTopicCategory != undefined
        && val.findTopicSubcategoryList != undefined && val.findTopicSubcategory != undefined
      ) {
        
        if (val.findTopicData.code == '200') {
          this.topicSubCategory = '0';
          this.language='0';
          this.noTopicFound = false;
          this.findTopicDetails = val.findTopicData.data;
          this.currentCategory = val.findTopicCategory;
          this.topicSubcategoryList = val.findTopicSubcategoryList,
          //this.topicSubCategory = val.findTopicSubcategory
            this.topicSubCategory = '0';
          this.loaderService.display(false);
        } else if (val.findTopicData.code == '404') {
          this.noTopicFound = true;
          this.findTopicDetails = [];
          this.topicSubcategoryList = val.findTopicSubcategoryList,
          this.topicSubCategory = '0';
          this.currentCategory = val.findTopicCategory;
          this.loaderService.display(false);
        }
      }
    });
  }

  getLanguge() {
    this.studentService.getStudentLanguages().subscribe((data) => {
      if (data.code == '200') {
        this.languageList = data.data;
      } else {
        this.router.navigate(['']);
      }
    }, error => {
      this.loaderService.display(false);
      this.router.navigate(['']);
    });
  }

  viewTopicInPopUp(data) {
    console.log(data)
    this.selectedTopicTitle = data.title;
    this.selectedTopicImage = data.image;
    this.selectedtopicDescription = data.description;
    $('#ShowtopicDetail').modal('show');

  }


  findTopic() {
    this.loaderService.display(true);
    var getTopic = {
      searchKey: '',
      limit: '0',
      sortKey: 'created',
      sortType: '1',
      category: this.currentCategory,
      language: this.language,
      subCategory: this.topicSubCategory
    }
    
    this.studentService.findTopic(getTopic).subscribe((data) => {
     if(data.code=='200'){
      this.noTopicFound=false;
      this.findTopicDetails=data.data;
     }
     else
     {
       this.noTopicFound=true;
       this.findTopicDetails=[];

     }
      this.loaderService.display(false);
    }, error => {
      this.noTopicFound=true;
      this.findTopicDetails=[];
      this.loaderService.display(false);
//      this.router.navigate(['']);
    });
  }

  OpenDiscussPopUp(_id){
    
    this.studentService.GetTeacherRelatedToTopic(_id).subscribe((data) => {
   
      if(data.code=='200'){
       this.noTopicFound=false;
       this.findTopicDetails=data.data;
      }
      else
      {
        this.noTopicFound=true;
        this.findTopicDetails=[];
 
      }
       this.loaderService.display(false);
     }, error => {
       
       this.noTopicFound=true;
       this.findTopicDetails=[];
       this.loaderService.display(false);
 //      this.router.navigate(['']);
     });
  }


}
