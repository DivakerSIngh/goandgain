import { Injectable } from '@angular/core';

@Injectable()
export class CalenderService {

  preparecalendar: any[] = [];
  constructor() { }


  getCalendarForm(): any[] {
  
  for(let i=1;i<=23;i++){
    if(i<=9){
    var value = 
      {
        "time": '0'+i+':00',
        "availability": {
          "Monday": false,
          "Tuesday": false,
          "Wednesday": false,
          "Thursday": false,
          "Friday": false,
          "Saturday": false,
          "Sunday": false
        }
      }
      this.preparecalendar.push(value);
    }
    else{
      var value = 
      {
        "time": i+':00',
        "availability": {
          "Monday": false,
          "Tuesday": false,
          "Wednesday": false,
          "Thursday": false,
          "Friday": false,
          "Saturday": false,
          "Sunday": false
        }
      }
      this.preparecalendar.push(value);
    }
    }

   let twentyFour= {
      "time": '00:00',
      "availability": {
        "Monday": false,
        "Tuesday": false,
        "Wednesday": false,
        "Thursday": false,
        "Friday": false,
        "Saturday": false,
        "Sunday": false
      }
    }
    this.preparecalendar.push(twentyFour);
    return this.preparecalendar;
  }
}
