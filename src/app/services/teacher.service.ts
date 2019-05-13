import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TeacherService {


  constructor(private http: Http) { }

  getHeaderOfApplication() {
    let headers = new Headers();
    headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('authtoken', localStorage.getItem('auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
    //headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  getHeaderOfApplicationWithAuthorization() {
    let headers = new Headers();
    // headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('authtoken', localStorage.getItem('auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }


  getHeaderOfApplicationJson() {
    let headers = new Headers();
    headers.append('Content-Type', "application/json")
    headers.append('authtoken', localStorage.getItem('auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }


  getAfterLoginHeaderOfApplication() {

    let headers = new Headers();
    headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('authtoken', localStorage.getItem('teacher-auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }


  //get teacher countries and their time zone
  getCountriesAndTimeZone() {
    return this.http.get(environment.serverUrl + 'users/country-with-time-zone', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  //get student full information
  getTeacherInformation() {
    return this.http.get(environment.serverUrl + 'tutor/view-tutor-info', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }




  //get client countrycode
  // getClientCountryCode() {
  //   return this.http.get('http://www.geoplugin.net/javascript.gp');
  // }



  //get country code
  getCountryCode() {
    return this.http.get(environment.serverUrl + 'users/countrie-with-code', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // teacher first step verification
  uploadTeacherProfileImage(data) {
    
    return this.http.post(environment.serverUrl + 'tutor/upload-image', data, { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  saveTeacherFirstStepData(obj) {
    let body = new URLSearchParams();
    body.set('firstName', obj.firstName);
    body.set('lastName', obj.lastName);
    body.set('phoneNumber', obj.phoneNumber);
    body.set('counrty', obj.country);
    body.set('timeZone', obj.timeZone.toString());
    body.set('image', obj.image);
    body.set('countryCode', obj.countryCode);
    body.set('countryName', obj.countryName);
    
    

    return this.http.patch(environment.serverUrl + 'tutor/setup-profile-first', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  //get teacher speaking languages

  getTeacherLanguages() {
    return this.http.get(environment.serverUrl + 'users/country-language', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //get teacher intrest
  getTeacherIntrest() {
    return this.http.get(environment.serverUrl + 'tutor/tutor-interests', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //save teacher intrest of language
  saveTeacherSecondStepData(obj) {

    let body = new URLSearchParams();
    body.set('parantInterest', obj.parantInterest);
    body.set('interests', obj.intrest);
    body.set('speakLanguage', obj.languageYouSpeak);
    body.set('teachLanguage', obj.languageYouTeach);
    
    return this.http.patch(environment.serverUrl + 'tutor/tutor-save-interests', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  saveTeacherEducationDetails(exp, docs) {
    let body = new URLSearchParams();
    body.set('educationData', JSON.stringify(exp));
    body.set('docs', docs);
   
    return this.http.patch(environment.serverUrl + "tutor/setup-education", body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  saveTeacherCertificationDetails(exp, docs) {

    let body = new URLSearchParams();
    body.set('certificationData', JSON.stringify(exp));
    body.set('docs', docs);

    
    return this.http.patch(environment.serverUrl + "tutor/setup-certification", body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  saveTeacherworkExperianceData(exp) {

    let body = new URLSearchParams();
    body.set('workExperienceData', JSON.stringify(exp));

   
    return this.http.patch(environment.serverUrl + "tutor/work-experience", body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  //save teacher introduction

  saveTeacherIntroduction(obj) {
    let body = new URLSearchParams();
    body.set('videoLink', obj.videoLink);
    body.set('videoUrlLink', obj.videoUrlLink);
    body.set('aboutMe', obj.aboutMe);

    
    return this.http.patch(environment.serverUrl + 'tutor/setup-introduction', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }


  saveTeacherAvailableTime(availableTime) {

    let body = new URLSearchParams();
    body.set('availableTime', JSON.stringify(availableTime));

    
    return this.http.patch(environment.serverUrl + "tutor/set-available-time", body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  isLoggedIn(): boolean {
    
    let token = localStorage.getItem('teacher-auth-token') || null;
    console.log(token);
    let role = localStorage.getItem('userRole') || null;
    if (token != null && role != null && role == '3') {
      return true
    }
    else {
      return false;
    }

  }



  getTeacherInformationForEdit() {
    return this.http.get(environment.serverUrl + 'tutor/view-tutor-info', { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getTeacherList(country, mainLanguage, limit) {
    console.log(environment.serverUrl + 'tutor/find-tutor?counrty=' + country + '&mainlanguage=' + mainLanguage + '&limit=' + limit)
    return this.http.get(environment.serverUrl + 'tutor/find-tutor?counrty=' + country + '&mainlanguage=' + mainLanguage + '&limit=' + limit, { headers: this.getHeaderOfApplicationJson() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getTeacherInformationOuter(teacherId) {
    return this.http.get(environment.serverUrl + 'outside/get-tutor-details?tutorId=' + teacherId, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  createCourse(obj) {
    let body = new URLSearchParams();
    body.set('targetStudentLevel', obj.tarStuLevel);
    body.set('courseType', obj.courseType);
    body.set('courseTitle', obj.courseTitle);
    body.set('courseDesciption', obj.courseDesciption);
    body.set('noOfLesson', obj.noOfLesson);
    body.set('price', obj.price);
    body.set('language', obj.language);

    
    return this.http.post(environment.serverUrl + 'tutor/create-course', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }


  //get student full information
  getTeacherInfoAfterLogin() {
    return this.http.get(environment.serverUrl + 'tutor/view-tutor-info', { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getAllCourses(limit) {
    return this.http.get(environment.serverUrl + 'tutor/my-courses?limit=' + limit, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  //get student full information
  getCourseDetails(courseId) {
    return this.http.get(environment.serverUrl + 'tutor/course-details?courseId=' + courseId, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteCourse(couserId) {
    let body = new URLSearchParams();
    body.set('courseId', couserId);
    return this.http.delete(environment.serverUrl + 'tutor/delete-course',
      new RequestOptions({
        headers: this.getAfterLoginHeaderOfApplication(),
        body: body.toString()
      }))
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  saveClassRate(obj) {
    let headers = new Headers();
    headers.append('Content-Type', "application/json")
    headers.append('authtoken', localStorage.getItem('teacher-auth-token'));    
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    
    
    return this.http.post(environment.serverUrl + 'tutor/add-classe-charges', obj,{ headers: headers })
      .map((res: Response) =>
        res.json()).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  uploadTeacherFiles(data) {
    
    let headers = new Headers();
    headers.append('authtoken', localStorage.getItem('teacher-auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return this.http.post(environment.serverUrl + 'tutor/upload-image', data, { headers: headers })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  
  ///////////////////////Edit Teacher Profile/////////////////////////////////////
  reSetupTutorProfile(data) {
    console.log(JSON.stringify(data));
    
    return this.http.post(environment.serverUrl + 'tutor/re-setup-tutor-profile', data.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  

}

