import { BrowserModule,   } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmbedVideo } from 'ngx-embed-video';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//const socketConfig: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

import { ClickOutsideModule } from 'ng-click-outside';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateModule} from 'ng2-translate';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./modules/shared/shared.module";

import { LoaderService } from './modules/shared/loader';


import { HeaderFooterService } from './modules/shared/header-footer.service'
import { HeaderComponent } from './modules/shared/header/header.component';
import { HeaderService } from './header.service';
import { LoginHeaderService } from '../../src/app/services/login-header.service';


import { TeacherService } from '../../src/app/services/teacher.service';


import { TeacherGuard } from '../../src/app/services/teacher.guard';
import { TeacherSubscriberService } from '../../src/app/services/teacher-subscriber.service';
import { RatingService } from '../../src/app/services/rating.service';


import { StudentService } from '../../src/app/services/student.service';
import { StudentGuard } from '../../src/app/services/student.guard';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { ValidattionDirective } from './directives/validation/validattion.directive';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { LoginPopupService } from './services/login-popup.service';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { NotFoundComponent } from './modules/commonpages/not-found/not-found.component';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("460998218213-gtgo8gldgutbrcio1lomc1i1aievgoml.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("148641569191133")
  }
]);



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ValidattionDirective,
    LoginPopupComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpModule,
    SocialLoginModule.initialize(config),  
    EmbedVideo.forRoot(),
    ClickOutsideModule,
    TranslateModule.forRoot() ,
   // SocketIoModule.forRoot(socketConfig)  
  ],
  exports: [
    BrowserAnimationsModule,
    ClickOutsideModule
  ],
  entryComponents: [
    LoginPopupComponent
  ],
  providers: [LoaderService, HeaderFooterService,HeaderService,
              LoginHeaderService,StudentService,StudentGuard, 
              TeacherService,TeacherGuard,LoginPopupService,TeacherSubscriberService,RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
