import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileLeftbarComponent } from './profile-leftbar/profile-leftbar.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { TeacherProfileLeftbarComponent } from './teacher-profile-leftbar/teacher-profile-leftbar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import {TranslateModule} from 'ng2-translate';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    TranslateModule
  ],
  declarations: [
    FooterComponent,
    LoginComponent,
    ModalComponent,
    ForgotComponent,
    SignupComponent,
    ProfileLeftbarComponent,
    AdvertisementComponent,
    NotificationMessageComponent,
    TeacherProfileLeftbarComponent,
    ChangePasswordComponent,
    CkeditorComponent,
  ],
  exports: [
    FooterComponent,
    ModalComponent,
    LoginComponent,
    ForgotComponent,
    SignupComponent,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,  
    MatSelectModule,
    ProfileLeftbarComponent,
    AdvertisementComponent,
    MatProgressBarModule,
    NotificationMessageComponent,
    TeacherProfileLeftbarComponent,
    ChangePasswordComponent,
    CkeditorComponent
    
  ]
})
export class SharedModule { }
