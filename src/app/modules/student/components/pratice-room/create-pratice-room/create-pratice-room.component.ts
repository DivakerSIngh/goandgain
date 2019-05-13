import { Component, OnInit,Inject,ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader';
import { StudentService } from '../../../../../services/student.service';


import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-pratice-room',
  templateUrl: './create-pratice-room.component.html',
  styleUrls: ['./create-pratice-room.component.css']
})
export class CreatePraticeRoomComponent implements OnInit {

 
  languageList: any = [];
  praticeGroupName:any='';
  praticeLanguage: any=0;
  praticeSubject:any='';
  praticeLevel:any=0;
  praticeMaxParticipation:any=0;
//new variable
  practiceRoomType:any=0;   //0 for public & 1 for private, 2 for Associated Group

  practicePassword:any='';
  groupId:any;
  isFromGroup:boolean=false;

  
  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private studentService: StudentService,
    private _location: Location,
    private router: Router) {

     }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get("id");
    if(this.groupId!=undefined){
      this.praticeGroupName =this.route.snapshot.paramMap.get("groupName");
      this.praticeSubject=this.route.snapshot.paramMap.get("groupSubject");
      this.practiceRoomType=2;
    }
    this.getLanguages();
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

  changeRoomType(){
      this.practicePassword='';
  }

  isFormValid():boolean{
    if(this.praticeGroupName!='' && this.praticeSubject!=''
     && this.praticeLanguage!=0 
     && this.praticeLevel!=0
     && this.praticeMaxParticipation!=0
     && 
     ((this.practiceRoomType == 2) ||
       (this.practiceRoomType == 0) 
    || (this.practiceRoomType ==1 && this.practicePassword!=''))
  ){
      return false;
    }

    return true;
  }

  CreatePracticeRoom(){


    //Type :
    //0 for public & 1 for private 2 for AssociatedGroup
  
    var createData={
      associatedSdyGrpId:this.groupId,
      name:this.praticeGroupName,
      maxParticipation:this.praticeMaxParticipation,
      subject :this.praticeSubject,
      level:this.praticeLevel,
      language:this.praticeLanguage,
      type:this.practiceRoomType,
      password:this.practicePassword
    }
    
    this.studentService.createPracticeRoom(createData).subscribe((data) => {
      
      if (data.code == '200') {
        this.router.navigate(['../practice-room']);
      }
    }, error => {
      
      // this.requiredStatus = error.message;
      console.log(error.code);
      //this.router.navigate(['']);
    });
  }
 
}
