import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class StudentService {

  constructor(private http: Http) { }

  getHeaderOfApplication() {
    let headers = new Headers();
    headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('authtoken', localStorage.getItem('auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }


  getHeaderWithoutLogin() {
    let headers = new Headers();
    headers.append('authtoken', localStorage.getItem('student-auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
    return headers;
  }
  getHeaderOfApplicationWithAuthorization() {
    let headers = new Headers();
    headers.append('authtoken', localStorage.getItem('auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }


  getAfterLoginHeaderOfApplication() {
    
    let headers = new Headers();
    headers.append('Content-Type', "application/x-www-form-urlencoded")
    headers.append('authtoken', localStorage.getItem('student-auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return headers;
  }

  //check whether student logged in or not
  isLoggedIn(): boolean {
    let token = localStorage.getItem('student-auth-token') || null;
    console.log(token);
    let role = localStorage.getItem('userRole') || null;
    if (token != null && role != null && role == '4') {
      return true
    }
    else {
      return false;
    }

  }

  // student first step verification
  saveStudentVerificationFirstStepData(data) {
    return this.http.post(environment.serverUrl + 'users/image-upload', data, { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  // student first step verification With social media
  saveStudentVerificationFromSocialMediaFirstStepData(image) {
    
    let body = new URLSearchParams();
    body.set('imageUrl', image);
    return this.http.post(environment.serverUrl + 'users/google-image-url', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //student second step verifiacion

  saveStudentSecondStepData(obj) {
   
    let body = new URLSearchParams();
    body.set('language', obj.language);
    body.set('counrty', obj.counrty);
    body.set('timeZone', obj.timeZone);
    body.set('countryName',obj.countryName);
   
    
    return this.http.patch(environment.serverUrl + 'users/edit-language', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }


  //student third step varification 
  saveStudentThirdStepData(obj) {
    let body = new URLSearchParams();
    body.set('mainlanguage', obj.mainlanguage);
    body.set('rate', obj.rate);
    return this.http.patch(environment.serverUrl + 'users/main-language', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }

  //student fourth step varification 
  saveStudentFourthStepData(obj) {
    let body = new URLSearchParams();
    body.set('interests', obj.intrest);
    body.set('purpose', obj.purpose);
    body.set('additionalinfo', obj.additionalInformation);
    body.set('parantInterest', obj.parantInterest);
    
    return this.http.patch(environment.serverUrl + 'users/save-interests', body.toString(), { headers: this.getHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));

  }



  //get student full information
  getStudentInformation() {
    return this.http.get(environment.serverUrl + 'users/view-user-info', { 
      headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //get Student countries and list of time zone
  getCountriesAndTimeZone() {
    return this.http.get(environment.serverUrl + 'users/country-with-time-zone', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //getcountryList

  getCountriesList() {
    return this.http.get(environment.serverUrl + 'users/country-list', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }




  //get student speaking languages
  getStudentLanguages() {
    return this.http.get(environment.serverUrl + 'users/country-language', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }




  //get student intrest
  getStudentIntrest() {
    return this.http.get(environment.serverUrl + 'users/my-interests', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
  //get student interest
  getStudtGroupCategories() {
    return this.http.get(environment.serverUrl + 'study-group/categorys', { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  searchStudentFriends(email) {
    
    return this.http.get(environment.serverUrl + 'users/search-friends?limit=0&email' + email, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  //get Group Details
  getGroupDetails(groupId) {
    return this.http.get(environment.serverUrl + 'study-group/study-group?studyGroupId=' + groupId + '&isLoggedIn=0', { headers: this.getHeaderWithoutLogin() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  getGroupDetailsInternal(groupId) {
    return this.http.get(environment.serverUrl + 'study-group/study-group-internal?studyGroupId=' + groupId + '&isLoggedIn=0', { headers: this.getHeaderWithoutLogin() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  findStudyGroups(searchKey, limt, sortKey, sortType,language) {
    return this.http.get(environment.serverUrl + 'study-group/find-study-group?limit=' + limt + '&search=' + searchKey + '&sortKey=' + sortKey + '&sortType=' + sortType +'&language='+language, { headers: this.getHeaderWithoutLogin() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  createStudyGroup(obj) {
    let body = new URLSearchParams();
    body.set('name', obj.name);
    body.set('image', obj.image);
    body.set('categoryId', obj.categoryId);
    body.set('country', obj.country);
    body.set('timeZone', obj.timeZone);
    body.set('subject', obj.subject);
    body.set('language', obj.language);
    body.set('description', obj.description);
    if(obj.membersId.length>0){
    body.set('membersId', obj.membersId);
    }
    body.set('subCategory', obj.subCategory);

    
    return this.http.post(environment.serverUrl + 'study-group/create-study-group', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  editStudyGroup(obj) {
    let body = new URLSearchParams();
    body.set('name', obj.name);
    body.set('image', obj.image);
    body.set('categoryId', obj.categoryId);
    body.set('country', obj.country);
    body.set('timeZone', obj.timeZone);
    body.set('subject', obj.subject);
    body.set('language', obj.language);
    body.set('description', obj.description);
    body.set('subCategory', obj.subCategory);
    body.set('studyGroupId', obj.studyGroupId);
    

    return this.http.patch(environment.serverUrl + 'study-group/edit-study-group', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  postGroupComment(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    
    return this.http.post(environment.serverUrl + 'study-group/create-comment-single', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  deleteGroupComment(messageId, groupId) {
    let body = new URLSearchParams();
    body.set('messageId', messageId);
    body.set('studyGroupId', groupId);
    
    // return this.http.delete(environment.serverUrl + 'study-group/comment-single?messageId='+messageId + '&studyGroupId='+groupId, { headers: this.getAfterLoginHeaderOfApplication()})
    return this.http.post(environment.serverUrl + 'study-group/comment-single', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  deleteGroupInnerComment(messageId, parentMessageId, studyGroupId) {

    let body = new URLSearchParams();
    body.set('messageId', messageId);
    body.set('parentMessageId', parentMessageId);
    body.set('studyGroupId', studyGroupId);
    // return this.http.delete(environment.serverUrl + 'study-group/comment-nested?messageId='+messageId+'&parentMessageId='+parentMessageId+'&studyGroupId='+studyGroupId, { headers: this.getAfterLoginHeaderOfApplication()})
    return this.http.post(environment.serverUrl + 'study-group/comment-nested', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })

      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  postInnerComment(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId)
    return this.http.post(environment.serverUrl + 'study-group/create-comment-nested', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  sendJoinRequest(studyGroupId) {
    let body = new URLSearchParams();
    body.set('studyGroupId', studyGroupId);
    return this.http.post(environment.serverUrl + 'study-group/add-request-study-group', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }








  //upload files
  uploadstudentFiles(data) {
   
    let headers = new Headers();
    headers.append('authtoken', localStorage.getItem('student-auth-token'));
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==")
    return this.http.post(environment.serverUrl + 'tutor/upload-image', data, { headers: headers })
      .map((res: Response) => {
        return res.json();
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }




  checkForHeaders() {
    return this.http.get(environment.serverUrl + 'users/header-check', { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }






  postGroupCommentInternal(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    
    return this.http.post(environment.serverUrl + 'study-group/create-comment-single-internal', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  deleteGroupCommentInteral(messageId, groupId) {
    let body = new URLSearchParams();
    body.set('messageId', messageId);
    body.set('studyGroupId', groupId);
    
    // return this.http.delete(environment.serverUrl + 'study-group/comment-single?messageId='+messageId + '&studyGroupId='+groupId, { headers: this.getAfterLoginHeaderOfApplication()})
    return this.http.post(environment.serverUrl + 'study-group/comment-single-internal', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  deleteGroupInnerCommentInternal(messageId, parentMessageId, studyGroupId) {

    let body = new URLSearchParams();
    body.set('messageId', messageId);
    body.set('parentMessageId', parentMessageId);
    body.set('studyGroupId', studyGroupId);
    // return this.http.delete(environment.serverUrl + 'study-group/comment-nested?messageId='+messageId+'&parentMessageId='+parentMessageId+'&studyGroupId='+studyGroupId, { headers: this.getAfterLoginHeaderOfApplication()})
    return this.http.post(environment.serverUrl + 'study-group/comment-nested-internal', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })

      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  postInnerCommentIntername(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId)
    return this.http.post(environment.serverUrl + 'study-group/create-comment-nested-internal', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //Bulletin Board

  creatingBulletinBoard(obj) {
    let body = new URLSearchParams();
    body.set('title', obj.articleHeading);
    body.set('categoryId', obj.category);
    body.set('language', obj.language)
    body.set('description', obj.description)
    body.set('image', obj.image)

    return this.http.post(environment.serverUrl + 'bulletins/create-bulletin', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  creatingBulletinBoardUrl(obj) {
    let body = new URLSearchParams();
    body.set('title', obj.articleHeading);
    body.set('categoryId', obj.category);
    body.set('url', obj.url)
    body.set('description', obj.description)
    body.set('image', obj.image)
    body.set('language', obj.language)
    
    return this.http.post(environment.serverUrl + 'bulletins/create-bulletin-url', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }





  editGroupComment(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId);
    return this.http.patch(environment.serverUrl + 'study-group/edit-comment-single', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }




  getallBulletinBoard(obj) {
    
    let headers = new Headers();
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
    return this.http.get(environment.serverUrl + 'bulletins/bulletin?limit=' + obj.limt + '&search=' + obj.searchKey + '&sortKey=' + obj.sortKey + '&sortType=' + obj.sortType + '&language=' + obj.language + '&category=' + obj.category, { headers: headers })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }



  getSingleBulletinBoardDetails(bulletinId) {
    let headers = new Headers();
    headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
    return this.http.get(environment.serverUrl + 'bulletins/view-bulletin?bulletinId=' + bulletinId, { headers: headers })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  editGroupCommentInternal(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId);
    return this.http.patch(environment.serverUrl + 'study-group/edit-comment-single', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  postBulletinBoardComment(obj) {
    let body = new URLSearchParams();
    body.set('bulletinId', obj.bulletinId);
    body.set('comment', obj.comment);

    return this.http.post(environment.serverUrl + 'bulletins/create-comment', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteBulletinBoardComment(messageId, bulletinId) {
    let body = new URLSearchParams();
    body.set('messageId', messageId);
    body.set('bulletinId', bulletinId);
    
    
    return this.http.post(environment.serverUrl + 'bulletins/bulletin-delete-comment', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  postBulletinBoardInnerComment(obj) {
    let body = new URLSearchParams();
    body.set('bulletinId', obj.bulletinId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId)
    return this.http.post(environment.serverUrl + 'bulletins/bulletin-create-comment-nested', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  
  editBulletinBoardComment(obj) {
    let body = new URLSearchParams();
    body.set('bulletinId', obj.bulletinId);
    body.set('comment', obj.comment);
    body.set('messageId', obj.messageId);
    return this.http.post(environment.serverUrl + 'bulletins/bulletin-edit-comment', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  deleteBulletinBoardInnerComment(messageId, parentMessageId, bulletinId) {
    
        let body = new URLSearchParams();
        body.set('messageId', messageId);
        body.set('parentMessageId', parentMessageId);
        body.set('bulletinId', bulletinId);
        // return this.http.delete(environment.serverUrl + 'study-group/comment-nested?messageId='+messageId+'&parentMessageId='+parentMessageId+'&studyGroupId='+studyGroupId, { headers: this.getAfterLoginHeaderOfApplication()})
        return this.http.post(environment.serverUrl + 'bulletins/bulletin-delete-comment-nested', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
    
          .map((res: Response) => {
            return res.json()
          }
          ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
      }

      leaveStudyGroup(obj) {
        let body = new URLSearchParams();
        body.set('studyGroupId', obj);
        return this.http.post(environment.serverUrl + 'study-group/leave-group', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
          .map((res: Response) => {
            return res.json()
          }
          ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
      }



      
 

  
  noticedCommentInGroups(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('messageId', obj.messageId);
    
    return this.http.post(environment.serverUrl + 'study-group/pinned-comment', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  };


  unPostNotice(obj) {
    let body = new URLSearchParams();
    body.set('studyGroupId', obj.studyGroupId);
    body.set('noticeId', obj.noticeId);
    body.set('commentId', obj.commentId);    

    return this.http.post(environment.serverUrl + 'study-group/unpinned', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  };



  resendMail(email){
    let body = new URLSearchParams();
    body.set('email', email);
    
    return this.http.post(environment.serverUrl + 'users/resend-link', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  fetchurlData(url) {
    
    return this.http.get(environment.serverUrl + 'bulletins/url-fetch?url=' + url, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  findMyStudyGroups(searchKey, limit, sortKey, sortType,userId) {
    
    return this.http.get(environment.serverUrl + 'study-group/user-study-groups?limit=' + limit + '&search=' + searchKey + '&sortKey=' + sortKey + '&sortType=' + sortType +'&userId='+userId, { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  getResetPasswordDetails(accesstoken) {
    return this.http.get(environment.serverUrl + 'users/check-token?accesstoken='+ accesstoken, { headers: this.getHeaderWithoutLogin() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


    inviteFriends(friendName, limit) {
      
      
      return this.http.get(environment.serverUrl + 'friends/show-non-friends?searchKey='+friendName+'&limit='+limit, { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    sendFriendRequest(friendId,connType) {
      
      //connType 0 for friend request and 1 for follow teacher
      
      let body = new URLSearchParams();
      body.set('requserId', friendId);
      body.set('connType', connType);
      return this.http.post(environment.serverUrl + 'friends/send-friend-req',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    acceptFriendRequest(friendId) {      
      
      let body = new URLSearchParams();
      body.set('frdreqId', friendId);
      return this.http.patch(environment.serverUrl + 'friends/accetp-friend-req',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    deleteFriendRequest(friendId) {      
      
      let body = new URLSearchParams();
      body.set('frdreqId', friendId);
      return this.http.delete(environment.serverUrl + 'friends/delete-friend-req', 
      new RequestOptions({
       headers: this.getAfterLoginHeaderOfApplication(),
       body: body.toString()
       }))
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }








    searchConnectedFriend(friendName, limit) {
      
      return this.http.get(environment.serverUrl + 'friends/search-friend?searchKey='+friendName+'&limit='+limit, { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


    getPendingFriendsRequestList(limit) {
      
      return this.http.get(environment.serverUrl + 'friends/my-pending-req?limit='+limit, { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


    findTopic(obj) {
      
      
      let headers = new Headers();
      headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
      return this.http.get(environment.serverUrl +
         'outside/outside-topic-list?limit=' + obj.limit + 
         '&search=' + obj.searchKey +
         '&sortkey=' + obj.sortKey +
         '&sortType=' + obj.sortType + 
         '&language=' + obj.language + 
         '&categoryId=' + obj.category+
         '&subCategoryId=' + obj.subCategory +
         '&status=1'
           , { headers: headers })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


    uploadGroupFiles(obj) {
      let body = new URLSearchParams();
      body.set('studyGroupId', obj.studyGroupId);
      body.set('fileName', obj.fileName);
      body.set('fileId', obj.fileId);    

      return this.http.post(environment.serverUrl + 'study-group/add-file', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    };

    pendingMyGroupRequest() {      
      return this.http.get(environment.serverUrl + 'study-group/group-request', { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    
    
    GetTeacherRelatedToTopic(topicId) {
      let headers = new Headers();
      headers.append('Authorization', "Basic YWRtaW5Aa2FvbGF3ZWJhcHAuY29tOjEyMzQ1Ng==");
     // return this.http.get(environment.serverUrl + 'outside/list-tutors?topicId='+topicId, { headers: headers })
     return this.http.get(environment.serverUrl + 'outside/interest-matched-tutors-list?topicId='+topicId, { headers: headers })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


    createPracticeRoom(obj) {
      
      

      let body = new URLSearchParams();
      body.set('associatedSdyGrpId', obj.associatedSdyGrpId);
      body.set('name', obj.name.trim());
      body.set('maxParticipation', obj.maxParticipation); 
      body.set('subject', obj.subject.trim()); 
      body.set('level', obj.level); 
      body.set('language', obj.language); 
      body.set('type', obj.type); 
      if(obj.type==1){
      body.set('password', obj.password); 
      }
      return this.http.post(environment.serverUrl + 'practice-room/create-practice-room', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
        .map((res: Response) => {
          return res.json()
        }
        ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
    };


     //get all practice room 
  GetAllPracticeRoom(language,search,limit) {
    
    return this.http.get(environment.serverUrl + 'outside/list-practice-room?limit='+limit+
        '&language='+language+
        '&search='+search,
        { headers: this.getHeaderOfApplicationWithAuthorization() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  viewStudentInfo() {
    return this.http.get(environment.serverUrl + 'users/view-user-info', { 
      headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {

        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //if someone sends request to join in group and someone accepts the request //
  acceptGroupRequest(reqId,groupId) {      
    let body = new URLSearchParams();
    body.set('studyGroupId',groupId);
    body.set('joinRequestId', reqId);
    
    return this.http.post(environment.serverUrl + 'study-group/allow-to-join',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  

  //if someone sends request to join in group and someone accepts the request //
  DeclineGroupRequest(reqId,groupId){
          
    let body = new URLSearchParams();
    body.set('joinRequestId', reqId);
    body.set('studyGroupId',groupId);
    
    return this.http.post(environment.serverUrl + 'study-group/decline-req',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
      .map((res: Response) => {
        return res.json()
      }
      ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }


  //remove member from group
  RemoveMemberFromGroup(reqId,groupId){
    
let body = new URLSearchParams();
body.set('joinRequestId', reqId);
body.set('studyGroupId',groupId);

return this.http.post(environment.serverUrl + 'study-group/remove-user-from-group',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
.map((res: Response) => {
  return res.json()
}
).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}

editStudentProfile(obj) {
  let body = new URLSearchParams();
  body.set('firstName', obj.firstName.trim());
  body.set('lastName', obj.lastName.trim());
  body.set('languages', obj.languages);
  body.set('mainlanguage', obj.mainlanguage);
  body.set('rate', obj.rate);
  body.set('additionalInfo', obj.additionalInfo.trim());
  body.set('countryName', obj.countryName);
  body.set('timeZone', obj.timeZone);
  body.set('counrty', obj.counrty);
  body.set('image', obj.image);

  
  return this.http.post(environment.serverUrl + 'users/edit-my-profile', body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}





getFriendDetials(friendId) {
  return this.http.get(environment.serverUrl + 'friends/show-friend-details?FriendsId='+friendId, { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}


getStudentFriendForCreatingStudyGroup() {
  return this.http.get(environment.serverUrl + 'friends/show-friend-list', { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}





getNonGroupMembersFriends(friendName, limit,studyGroupId) {
  
  
  return this.http.get(environment.serverUrl + 'study-group/non-group-members-friends?studyGroupId='+studyGroupId+'&searchKey='+friendName+'&limit='+limit, { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}



InviteFriendsOnGroup(friendId,groupId){
  
let body = new URLSearchParams();
body.set('userId', friendId);
body.set('studyGroupId',groupId);
return this.http.post(environment.serverUrl + 'study-group/invite-on-group',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
.map((res: Response) => {
return res.json()
}
).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}

getFavTeacherList(limit,loggedInId) {
  return this.http.get(environment.serverUrl + 'tutor/tutor-followed-by-me?limit='+limit+'&userId='+loggedInId, { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}

unFavTeacher(teacherId) {
  let body = new URLSearchParams();
  body.set('tutorId', teacherId);
  return this.http.post(environment.serverUrl + 'tutor/unfollow-tutor',body.toString(), { headers: this.getAfterLoginHeaderOfApplication() })
    .map((res: Response) => {
      return res.json()
    }
    ).catch((error: any) => Observable.throw(error.json() || 'Server error'));
}

}
