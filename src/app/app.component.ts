import { Component, OnInit, HostListener, ElementRef, Renderer } from '@angular/core';
import { fadeInAnimation } from './modules/animation/index';
import { LoaderService } from './modules/shared/loader';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { LoginHeaderService } from '../app/services/login-header.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },

})
export class AppComponent {
  title = 'app';
  showLoader: boolean;



  //-------------- show tutor list data on hover -------------

  @HostListener('mouseover') onMouseHover() {
    var getFooter = document.querySelectorAll('.tutorlist-combine');
    var footerArr = Array.prototype.slice.call(getFooter);
    var getOffset = document.querySelectorAll('.tutortime-schedule');
    var getList = document.querySelectorAll('.tutorlisting-column');
    var getListArr = Array.prototype.slice.call(getList);
    var getOffsetArr = Array.prototype.slice.call(getOffset);
    var ele = this.findAncestor(event.target, 'tutorlisting-column');
    var getLastIndex = getListArr.indexOf(ele)
    if (ele !== null) {
      if (getLastIndex !== getListArr.length - 1) {
        getOffsetArr[0].classList.add('topView');
        if (getOffsetArr[0].classList.contains('bottomView')) {
          getOffsetArr[0].classList.remove('bottomView');
        }
        getOffsetArr[0].setAttribute('style', 'top:' + (ele.offsetTop) + 'px')
      } else {
        getOffsetArr[0].classList.add('bottomView');
        if (getOffsetArr[0].classList.contains('topView')) {
          getOffsetArr[0].classList.remove('topView');
        }
        console.log(footerArr[0].offsetHeight)
        getOffsetArr[0].setAttribute('style', 'top:' + (footerArr[0].offsetHeight - getOffsetArr[0].offsetHeight) + 'px')
      }
    }
  }
  //-------------- show tutor list data on hover -------------

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
  
    var getOffset = document.querySelectorAll('.trial-wrapper');
    var getOffArr = Array.prototype.slice.call(getOffset);
    var winH = window.scrollY;
    // var gonnaH = document.querySelector('.footer')
    var getFooter = document.querySelectorAll('footer');
    var footerArr = Array.prototype.slice.call(getFooter);
    var gonnaH = footerArr[0].offsetTop - winH - window.innerHeight;
    if (gonnaH < 0) {
      if (getOffArr.length > 0) {
        getOffArr[0].setAttribute('style', 'top:' + (gonnaH) + 'px')
      }
    } else {
      if (window.scrollY > 100) {
        if (getOffArr.length > 0) {
          getOffArr[0].classList.add('topView');
        }
      } else {
        if (getOffArr.length > 0) {
          getOffArr[0].setAttribute('style', 'top:0');
          getOffArr[0].classList.remove('topView');
        }
      }
    }


  }


  /////////////////-----------------Change Language-----------------------//////////////
  changeLanguage(value) {

    this.translate.use(value);

  }


  //----------------------------------------



  constructor(private loaderService: LoaderService,
    private loginHeaderService: LoginHeaderService, private router: Router, private el: ElementRef,
    private renderer: Renderer, private translate: TranslateService) {

    var chooseLanguage = localStorage.getItem('preferLanguage') || null;
    
    translate.addLangs(["en", "es", 'cn','ko','jp']);
    // translate.setDefaultLang(this.myLanguage);
    // translate.use(this.myLanguage);
    if (chooseLanguage != null) {
      translate.use(chooseLanguage);
    } else {
      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|es|cn|ko|jp/) ? browserLang : 'en');
    }


    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  ngOnInit(): void {

    this.showLoader = false;
    this.loaderService.getValue.subscribe((val: boolean) => {
      this.showLoader = val;
      if (val) {
        //disabling scrolling in window
        window.addEventListener('scroll', noscroll);
        console.log('addEventListener scroll');
      }
      else {
        window.removeEventListener('scroll', noscroll);
        console.log('removeEventListener scroll');
      }

    });
    function noscroll() {
      window.scrollTo(0, 0);
    }
    
    var studentDetails = localStorage.getItem('student-details') || null;
    if (studentDetails != null) {
      this.loginHeaderService.setLoginValue(JSON.parse(studentDetails));
    }

    var teacher = localStorage.getItem('teacher-details') || null;
    if (teacher != null) {
      this.loginHeaderService.setLoginValue(JSON.parse(teacher));
    }

  }

  findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
  onDeactivate() {

    //document.body.scrollTop = 0;
    // Alternatively, you can scroll to top by using this other call:
    //window.scrollTo(0, 0)
  }
}
