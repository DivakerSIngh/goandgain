import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoaderService } from '../..../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service'
import { RatingService } from '../../../../services/rating.service'


@Component({
  selector: 'app-student-full-details',
  templateUrl: './student-full-details.component.html',
  styleUrls: ['./student-full-details.component.css']
})
export class StudentFullDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    private ratingService: RatingService,
    private router: Router
  ) { }

  friendId:any=0;
  friendDetails:any=[];
  frdGroups:any=[];
  frdfollowData:any=[];
  frdOfFrnd:any=[];
  moreGroup:boolean=false;
  moreFriend:boolean=false;
  moreFollowTeacher:boolean=false;
  ngOnInit() {
    this.loader.display(true);
    this.friendId = this.route.snapshot.paramMap.get("id");
    this.getMyFriendDetails(this.friendId)
  }



  getMyFriendDetails(friendId) {
    this.studentService.getFriendDetials(friendId).subscribe((data) => {

      if (data.code == '200') {
        
        this.friendDetails = data.data;
        this.frdGroups=data.frdGroup;

        if(this.frdGroups.length>4){
          this.moreGroup=true;
        }
        this.frdfollowData=data.FrdfollowData;

        if(this.frdfollowData.length>4){
          this.moreFollowTeacher=true;
        }
        this.frdOfFrnd=data.frdOfFrnd;
        if(this.frdOfFrnd>4){
          this.moreFriend=true;
        }
  
      } else {
        //this.router.navigate(['']);
      }
      this.loader.display(false);

    }, error => {
      this.loader.display(false);
    });
  };

  getRating(rating):any {
    
    let rate = 0;
    if (rating != undefined) {
      rate = this.ratingService.tutorRating(rating);
      if (rate == NaN) {
        rate = 0;
      }
    }
    else {
      rate = 0;
    }
   return  rate +'%';
  }

}
