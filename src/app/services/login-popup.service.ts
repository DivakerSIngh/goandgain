import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class LoginPopupService {

  public bs = new BehaviorSubject<any>({});
  constructor() { }

  setValueForLoginPopUp(val: any) {
    this.bs.next(val);
  }

  get getValueForLoginPopup() {
    return this.bs.asObservable();
  }

}
