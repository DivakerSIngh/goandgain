import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AccountService {

  constructor(private http: Http) { }

  //this method used for send request to  the user login

  getHeaderOfApplication() {
    let headers = new Headers();
    headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('Authorization',"Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }
  signup(obj) {
    
    let body = new URLSearchParams();
    body.set('firstName', obj.firstName.trim());
    body.set('lastName', obj.lastName.trim());
    body.set('email', obj.email.trim());
    // body.set('country', 'IN');
    body.set('password', obj.password);
    body.set('isSocial', obj.isSocial);
    //loginType 4 for student and 3 for teacher
    if (obj.isStudent == '1') {
      body.set('loginType', '4');
    } else {
      body.set('loginType', '3');
    }
    
    console.log("control in the sign up service");
    return this.http.post(environment.serverUrl + 'users/registration', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  forgotPassword(email) {
    let body = new URLSearchParams();
    body.set('email', email.trim());
    console.log("control in forgot email service");
    return this.http.post(environment.serverUrl + 'users/forgot-password', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  userAlreadyExistsOrNot(obj) {
    let body = new URLSearchParams();
    body.set('email', obj.email.trim());
    console.log("control in User alreay exists or not Service");
    return this.http.post(environment.serverUrl + 'users/social-login', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  signIn(obj) {
    let body = new URLSearchParams();
    body.set('email', obj.email.trim());
    body.set('password', obj.password.trim());
    //loginType 4 for student and 3 for teacher
    if (obj.isStudent == '1') {
      body.set('loginType', '4');
    } else {
      body.set('loginType', '3');
    }
    console.log("control in the sign In service");
    return this.http.post(environment.serverUrl + 'users/login', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json();
      }).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  resetPassword(obj) {
    let body = new URLSearchParams();
    body.set('newpassword', obj.newpassword);
    body.set('token', obj.token);    
    console.log("resetPassword");
    return this.http.post(environment.serverUrl + 'users/reset-password', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
