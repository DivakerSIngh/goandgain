import { Injectable } from '@angular/core';

@Injectable()
export class RatingService {

  constructor() { }

  tutorRating(rating:any):any{
       return rating*100/5;
  }
}
