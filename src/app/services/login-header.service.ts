import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class LoginHeaderService {

  public bs = new BehaviorSubject<any>({});
  constructor() { }

  setLoginValue(val: any) {
    this.bs.next(val);
  }

  get getHeaderValue() {
    return this.bs.asObservable();
  }

}
