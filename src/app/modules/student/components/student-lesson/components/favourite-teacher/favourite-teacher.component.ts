import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoaderService } from '../../../../../../modules/shared/loader'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../../../../services/student.service';
import { RatingService } from '../../../../../../services/rating.service';


declare var $: any;
@Component({
  selector: 'app-favourite-teacher',
  templateUrl: './favourite-teacher.component.html',
  styleUrls: ['./favourite-teacher.component.css']
})
export class FavouriteTeacherComponent implements OnInit {

  favTeacherList: any = [];
  limit: number = 0;

  unfollowId: any;
  unfollowIndex: any;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loader: LoaderService,
    private router: Router,
    private ratingService:RatingService
  ) {
  }

  ngOnInit() {
    this.loader.display(true);
    var loggedInId = localStorage.getItem('student-id');
    this.getMyfavTeacher(this.limit,loggedInId);
  }


  getMyfavTeacher(limit,loggedInId) {
    this.studentService.getFavTeacherList(limit,loggedInId).subscribe((data) => {
      
      if (data.code == '200') {
        this.favTeacherList = data.data;
      }
      else if (data.code = '404') {
        this.favTeacherList = [];
      }
      this.loader.display(false);

    }, error => {
      
      this.loader.display(false);
    });
  };

  openConfirMationPopUp(unFollowId, UnfollowIndex) {
    this.unfollowId = unFollowId;
    this.unfollowIndex = UnfollowIndex;
    $('#unfollowTeacher').modal('show');
  }

  unfollowTeacher() {
    this.loader.display(true);
    localStorage.setItem('removeFav', this.unfollowIndex);
    this.studentService.unFavTeacher(this.unfollowId).subscribe((data) => {
      

      if (data.code == '200') {

        var index = localStorage.getItem('removeFav');
        this.favTeacherList.splice(index, 1);
      }
      else if (data.code = '404') {
        this.favTeacherList = [];
      }
      $('#unfollowTeacher').modal('hide');

      this.loader.display(false);

    }, error => {
      
      $('#unfollowTeacher').modal('hide');
      this.loader.display(false);
    });
  }

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
