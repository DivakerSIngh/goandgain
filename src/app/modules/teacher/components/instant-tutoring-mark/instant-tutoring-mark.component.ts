import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherSubscriberService } from '../../../../services/teacher-subscriber.service';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-instant-tutoring-mark',
  templateUrl: './instant-tutoring-mark.component.html',
  styleUrls: ['./instant-tutoring-mark.component.css']
})
export class InstantTutoringMarkComponent implements OnInit {
  isChecked: boolean = false;

  //@Input() isChecked:boolean=false;

  subscription: ISubscription;
  constructor(private teacherSubscriberService: TeacherSubscriberService) { }

  ngOnInit() {
    // this.change.emit(this.isChecked);

    this.subscription= this.teacherSubscriberService.bs.subscribe((val: any) => {
      

      if (val.isInstant != undefined && val.isInstant == true) {
        this.isChecked = true;
      }
    });

  }

  changeInstant() {
    
    //this.isChecked=!this.isChecked
    //alert(this.isChecked);
    var obj = {
      isInstantTutoring: this.isChecked
    }
    this.teacherSubscriberService.setValue(obj);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
