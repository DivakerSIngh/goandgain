import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class TeacherSubscriberService {

  public bs = new BehaviorSubject<any>({});
  constructor() { }

  setValue(val: any) {
    this.bs.next(val);
  }

  get getValue() {
    return this.bs.asObservable();
  }

}
