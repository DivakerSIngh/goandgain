import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../../../../services/teacher.service'

import { LoaderService } from '../../../../../../../modules/shared/loader'
@Component({
  selector: 'app-edit-introduction',
  templateUrl: './edit-introduction.component.html',
  styleUrls: ['./edit-introduction.component.css']
})
export class EditIntroductionComponent implements OnInit {

  formData: any;
  introductionUrl: string = '';
  introductionUrlText: string = '';
  introduction: string = '';
  requiredStatus: string = '';
  noVideo: boolean = false;
  aboutYourSelf: string = '';
  noAboutYourSelf: boolean = false;
  uploadedVideoName: string = '';
  IsFile:boolean=false;
  remainingChar:number=200;
  responseMessage:string='';
  constructor(private teacherService: TeacherService,
    // private route: ActivatedRoute,
    // private router: Router,
    private loaderService: LoaderService,
    // private headerService :HeaderService
  ) { }

  ngOnInit() {

    var teacherDetails = localStorage.getItem('teacher-full-details') || null;
    
    if (teacherDetails != null) {
      var techerInfo = JSON.parse(teacherDetails);
      this.getTeacherInformation(techerInfo);
    }
    

  }
 

  //fetching teacher information method
  getTeacherInformation(techerInfo) {
  

         

          if (techerInfo.videoUrlLink!=undefined && techerInfo.videoUrlLink!='') {
            this.introductionUrlText = techerInfo.videoUrlLink;
          }

          if (techerInfo.aboutMe != undefined) {
            this.aboutYourSelf = techerInfo.aboutMe;
            this.remainingChar= 200-this.aboutYourSelf.length;
          }

        }
        



  editIntrouduction() {
    
    if (this.introductionUrl != '' || this.introductionUrlText != '') {
      if(this.matchYoutubeUrl(this.introductionUrlText)){
      this.noVideo = false;
      if (this.aboutYourSelf != '') {
        this.loaderService.display(true);
        this.noAboutYourSelf = false;
      
        let body = new URLSearchParams();        
        body.set('videoUrlLink', this.introductionUrlText);
        body.set('aboutMe', this.aboutYourSelf);
        this.teacherService.reSetupTutorProfile(body).subscribe((data) => {
        
          if (data.code == '200') {
            this.responseMessage = "Request has been sent to admin for approval .";
          } else {
            this.responseMessage = "There is some internal error";
          }
          this.loaderService.display(false);
  
          
         
        }, error => {

          this.loaderService.display(false);
          console.log(error.code)

        });

      }
      else {
        this.noAboutYourSelf = true;
      }
    }else{
      this.noVideo=true;
    }
      
    }
    else {
      this.noVideo = true;
      window.scrollTo(0, 0);
    }
  }

  matchYoutubeUrl(url:string) {
    
   if(url.startsWith("https")){
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = url.match(p);
    if(matches){
       return true;
    }
    return false;
  }
  return false;
}

}
