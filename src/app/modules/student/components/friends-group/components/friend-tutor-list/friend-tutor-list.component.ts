import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoaderService } from '../..../../../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../../../services/student.service'

import { RatingService } from '../../../../../../services/rating.service'

@Component({
  selector: 'app-friend-tutor-list',
  templateUrl: './friend-tutor-list.component.html',
  styleUrls: ['./friend-tutor-list.component.css']
})
export class FriendTutorListComponent implements OnInit {

  friendId: any = 0;

  frdfollowTutor: any = [];
  limit: number = 0;
  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    private router: Router,
    private ratingService: RatingService) { }

  ngOnInit() {
    this.loader.display(true);
    this.friendId = this.route.snapshot.paramMap.get("id");
    this.getFriendFavTeacher(this.limit, this.friendId)
  }


  getFriendFavTeacher(limit, friendId) {
    this.studentService.getFavTeacherList(limit, friendId).subscribe((data) => {
  
      if (data.code == '200') {
        this.frdfollowTutor = data.data;
      }
      else if (data.code = '404') {
        this.frdfollowTutor = [];
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


