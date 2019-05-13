import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';
import {ISubscription} from "rxjs/Subscription";
import { DomSanitizer } from '@angular/platform-browser';

import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-teacher-video',
  templateUrl: './teacher-video.component.html',
  styleUrls: ['./teacher-video.component.css']
})
export class TeacherVideoComponent implements OnInit {

  teacherIntroductionVideo: any;
  thumbnail: any;
  showVid: boolean = false;
  subscription: ISubscription;
  show:boolean=false;
  // @ViewChild('iframeRef') iframeRef:HTMLIFrameElement;
  constructor(private teacherSubscriberService: TeacherSubscriberService,
    private _sanitizer: DomSanitizer,
    private embedService: EmbedVideoService) { }

  ngOnInit() {
  this.subscription=  this.teacherSubscriberService.bs.subscribe((val: any) => {
      
      this.showVid = false;
      if (val.video != undefined) {
        

        this.show=true;
        var image = this.embedService.embed_image(val.video,{ image: 'mqdefault' });
        if (image != undefined && image.__zone_symbol__value != undefined && image.__zone_symbol__value.html != undefined) {
          this.thumbnail = image.__zone_symbol__value.html;
        }
        else {
          this.thumbnail = "";
        }
        // var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg"; 
        console.log("this is embed test", this.embedService.embed(val.video,{
          "query":{autoplay:1},
          "attr":{height:'100%',width:'100%'}
      }));
        //alert(val.teacherIntroductionVideo)
        this.teacherIntroductionVideo = this.embedService.embed(val.video,{"query":{autoplay:1},"attr":{height:'100%',width:'100%'}});
        //  this.teacherIntroductionVideo ="https://www.youtube.com/embed/ZbKwc1lfuHA";
        //var ifrm = document.getElementById('iframeRef');
        //iframeRef.src=val.teacherIntroductionVideo;
        // this.iframeRef.src=this.teacherIntroductionVideo;
        //this.iframeRef.

        //var details= this._sanitizer.bypassSecurityTrustResourceUrl(val.teacherIntroductionVide); 
        //this.teacherIntroductionVideo = this._sanitizer.bypassSecurityTrustResourceUrl(val.teacherIntroductionVide); 
        // alert(this.teacherIntroductionVideo)

      }
      else{
        this.show=false;
      }
    });


  }
  getEmbedUrl() {
    
    // var url=this.teacherIntroductionVideo;
    // var code =url.substring(url.indexOf('=')+1,url.length)
    // return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+code); 

  }

  showvideo() {
    this.showVid = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
