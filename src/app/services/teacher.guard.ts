import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TeacherService } from '../../app/services/teacher.service'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginHeaderService } from '../services/login-header.service';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private router:Router,
    private teacherService: TeacherService,
    private loginHeaderService:LoginHeaderService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    if (this.teacherService.isLoggedIn()) {
      return true;
    }else{
    this.loginHeaderService.setLoginValue({});
    this.router.navigate(['/']);
    return false;
    }
  }
}
