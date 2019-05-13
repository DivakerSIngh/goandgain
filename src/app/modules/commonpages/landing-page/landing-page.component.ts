import { Component, OnInit, HostListener, Input, ElementRef } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { HeaderService } from '../../../../../../Koalatalk/src/app/header.service';

import { ActivatedRoute, Router } from '@angular/router';
import { LoginPopupService } from '../../../services/login-popup.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ],

})
export class LandingPageComponent implements OnInit {

  visibilityChanged: String = "hidden";
  constructor(private headerService: HeaderService, private route: ActivatedRoute,
    private loginPopupService: LoginPopupService) {}

  ngOnInit() {
    this.headerService.setHeaderValue(false);
    var resetPasswordDetails = this.route.snapshot.paramMap.get("auth-token");
    
    if (resetPasswordDetails != null) {
      var obj = {
        resetPassword: resetPasswordDetails
      }
      this.loginPopupService.setValueForLoginPopUp(obj);
    }
    else {
      this.loginPopupService.setValueForLoginPopUp({});
    }

    setTimeout(() => {
      this.visibilityChanged = "shown";
    }, 100);
  }

onClickedOutside(Event) {
    console.log('Clicked outside');
  }



}
