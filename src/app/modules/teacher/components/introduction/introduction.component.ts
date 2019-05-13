import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../modules/shared/loader'
import { TeacherService } from '../../../../services/teacher.service'

import { HeaderService } from '../../../../header.service';
import { ActivatedRoute, Router, NavigationExtras, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  providers: [TeacherService]
})
export class IntroductionComponent implements OnInit {


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
  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private headerService :HeaderService) { }

  ngOnInit() {

    this.headerService.setHeaderValue(true);
    this.formData = new FormData();
    this.getTeacherInformation();

  }
  goToPreviouseStep() {
    this.router.navigate(['../../teacher/work-experience']);
  }

  //checking the valid file
  isValidImage(ext: string): boolean {
    if (ext != "avi" && ext != "flv" && ext != "mp4") {
      return false;
    }
    return true;
  }


  //choose video 
  onFileChange(fileInput) {
    
    this.loaderService.display(true);
    let fileList: FileList = fileInput.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(fileList, file);
      let fileSize: number = fileList[0].size;
      let fileExtenstion = fileList[0].name.split('.').pop();
      localStorage.setItem('vidsName', file.name);
      if (this.isValidImage(fileExtenstion.toLowerCase())) {
        //3 MB
        if (fileSize <= 3072000) {


          this.formData.append('userImage', file);
          //this.formData.set('userImage', file);
          this.teacherService.uploadTeacherProfileImage(this.formData).subscribe((data) => {

            if (data.code == '200') {
              this.uploadedVideoName = localStorage.getItem('vidsName') || null;
              this.introductionUrl = data.imageURL;
              this.requiredStatus = '';
              this.loaderService.display(false);
              this.noVideo = false;
              this.IsFile=true;
            }
            else {
              this.requiredStatus = 'There is some internal error.';
              this.loaderService.display(false);
              //this.router.navigate(['']);
            }


          }, error => {
            this.requiredStatus = error.message;
            console.log(error.code);
            //this.router.navigate(['']);
          });

        }
        else {
          this.noVideo = true;
          this.loaderService.display(false);
          this.requiredStatus = 'file size can not be more than 3 Mb.';
        }
      }
      else {
        this.loaderService.display(false);
        this.requiredStatus = 'Please upload only .mp4, .avi or .flv file';
      }
    }

  }

  removeFile(){
    this.introductionUrl = '';
    this.IsFile=false;
  }


  //fetching teacher information method
  getTeacherInformation() {
    this.teacherService.getTeacherInformation().subscribe((data) => {
      
      if (data.code == '200') {
        if (data.tutorsInfo.length > 0) {

          if (data.tutorsInfo[0].videoLink != undefined && data.tutorsInfo[0].videoLink!=null && data.tutorsInfo[0].videoLink!='') {

            var url = data.tutorsInfo[0].videoLink.split('/');
            var newName = url[url.length - 1];
            this.uploadedVideoName = newName;
            this.introductionUrl = data.tutorsInfo[0].videoLink;
            this.IsFile=true;
          }

          if (data.tutorsInfo[0].videoUrlLink != undefined && data.tutorsInfo[0].videoUrlLink!=null && data.tutorsInfo[0].videoUrlLink!='') {
            this.introductionUrlText = data.tutorsInfo[0].videoUrlLink;
          }


          if (data.tutorsInfo[0].aboutMe != undefined) {
            this.aboutYourSelf = data.tutorsInfo[0].aboutMe;
            this.remainingChar= 200-this.aboutYourSelf.length;
          }

        }
        this.loaderService.display(false);
      } else {
        this.loaderService.display(false);
        this.router.navigate(['']);
      }
    }, error => {
      this.router.navigate(['']);
    });
  };






  getTextAreacount(){
    this.remainingChar= 200-this.aboutYourSelf.length;
   }




  goToNextStep() {
    
    if (this.introductionUrl != '' || this.introductionUrlText != '') {
      if(this.matchYoutubeUrl(this.introductionUrlText)){
      this.noVideo = false;
      if (this.aboutYourSelf != '') {
        this.loaderService.display(true);
        this.noAboutYourSelf = false;
        var videoUrl;
        var obj = {
          videoLink: this.introductionUrl,
          videoUrlLink: this.introductionUrlText,
          aboutMe: this.aboutYourSelf
        }

        this.teacherService.saveTeacherIntroduction(obj).subscribe((data) => {

          this.loaderService.display(false);
          this.loaderService.display(false);
          if (data.code == '200') {
            this.router.navigate(['../../teacher/general-availability']);
          } else {
            this.router.navigate(['']);
          }
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

  skipStep()
  {
    this.router.navigate(['../../teacher/general-availability']);
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
