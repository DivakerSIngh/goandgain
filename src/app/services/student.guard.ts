import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { StudentService } from '../../app/services/student.service'
import { ActivatedRoute, Router } from '@angular/router';
//import { LoginHeaderService } from '../../../services/login-header.service'

import { LoginHeaderService } from '../services/login-header.service';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private router:Router,
              private studentService: StudentService,
              private loginHeaderService:LoginHeaderService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.studentService.isLoggedIn()) {
      return true;
    }else{
    this.loginHeaderService.setLoginValue({});
    this.router.navigate(['/']);
    return false;
    }
  }
}
