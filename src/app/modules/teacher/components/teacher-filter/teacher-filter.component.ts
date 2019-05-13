import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { TeacherService } from '../../../../services/teacher.service';
import { StudentService } from '../../../../services/student.service';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-teacher-filter',
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.css']
})
export class TeacherFilterComponent implements OnInit {

  languages:any=[];

  countryList:any=[];

  language:any=0;
  countryName:any=0;
  limit:any=0;
  constructor(private teacherService: TeacherService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private studentService:StudentService,
    private teacherSubscriberService:TeacherSubscriberService) { }

  ngOnInit() {
    this.getLanguages();
    this.getCountryList();
    this.getTeacherList(this.countryName,this.language,this.limit);
  }

 getTeacherList(country,language,limit) {
   
   this.loaderService.display(true);
    this.teacherService.getTeacherList(country,language,limit).subscribe((data) => {
      
      if (data.code == '200') {
       var object={
         teacherListing:true,
         code :data.code,
         data:data.data
       }
        this.teacherSubscriberService.setValue(object);
        
      }else{
        var noFound={
          teacherListing:false,
          code :404,
          data:[]
        }
       this.teacherSubscriberService.setValue(noFound);
        
      }
       
    }, error => {
      
      this.loaderService.display(false);
      //this.router.navigate(['']);
    });
  };


  filterTeacher(){
    this.loaderService.display(true);
    this.getTeacherList(this.countryName,this.language,this.limit);    
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


  getCountryList() {
    this.studentService.getCountriesList().subscribe((data) => {
      if (data.code == '200') {
        this.countryList = data.countries;
      } else {
        // this.router.navigate(['']);
      }
    }, error => {

      this.router.navigate(['']);
      console.log(error.code)
    });

  }


  // this.form1 = this.formBuilder.group({ 'single': [ 10 ] });

  timingControl = new FormControl();

  timingOfDay = [
    {
      name: 'Time of day',
      timing: [
        { value: 'night-0', viewValue: 'Late night' },
        { value: 'morning-1', viewValue: 'Morning' },
        { value: 'evening-2', viewValue: 'Evening' },
        { value: 'afternoon-3', viewValue: 'Afternoon' }
      ]
    },
  ];

  day=[
    {
      name:'Day',
      days:[
        {value:'Monday'},
        {value:'Tuesday'},
        {value:'Wednesday'},
        {value:'Thursday'},
        {value:'Friday'},
        {value:'Saturday'},
        {value:'Sunday'}

      ]
    }
  ]

}
