import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class HeaderService {
  public bs = new BehaviorSubject<boolean>(false);
  constructor() { }

  setHeaderValue(val: boolean) {
    this.bs.next(val);
  }

  get getHeaderValue() {
    return this.bs.asObservable();
  }
}
