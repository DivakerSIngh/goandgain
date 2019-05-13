import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommonPageRouterModule } from './commonpages.router';
import { BecomeTutorComponent } from './become-tutor/become-tutor.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../app/services/account.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import {TranslateModule} from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    CommonPageRouterModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [
    LandingPageComponent, 
    BecomeTutorComponent, 
    ForgotPasswordComponent,
    
  ],
  providers:[AccountService]
})
export class CommonpagesModule { }
