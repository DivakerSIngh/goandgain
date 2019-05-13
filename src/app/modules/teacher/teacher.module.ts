import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRouterModule } from './teacher.router';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import {TranslateModule} from 'ng2-translate';
import { GeneralProfileComponent } from './components/general-profile/general-profile.component';
import { LanguageComponent } from './components/language/language.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationComponent } from './components/certification/certification.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ApplicationComponent } from './components/application/application.component';
import { GeneralAvailabilityComponent } from './components/general-availability/general-availability.component';

import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherFilterComponent } from './components/teacher-filter/teacher-filter.component';
import { TeacherVideoComponent } from './components/teacher-video/teacher-video.component';
import { TeacherCalendarComponent } from './components/teacher-calendar/teacher-calendar.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeacherClassesComponent } from './components/teacher-classes/teacher-classes.component';
import { TeacherRatingComponent } from './components/teacher-rating/teacher-rating.component';

import { TeacherProfilesComponent } from './components/teacher-profiles/teacher-profiles.component';
import { AvailabilityComponent } from './components/teacher-profiles/admin/availability/availability.component';
import { ClassRatesComponent } from './components/teacher-profiles/admin/class-rates/class-rates.component';
import { CoursesComponent } from './components/teacher-profiles/admin/courses/courses.component';
import { CreateCoursesComponent } from './components/teacher-profiles/admin/create-courses/create-courses.component';
import { CourseDetailsComponent } from './components/teacher-profiles/admin/course-details/course-details.component';
import { TeacherNotificationComponent } from './components/teacher-profiles/settings/teacher-notification/teacher-notification.component';
import { InstantTutoringMarkComponent } from './components/instant-tutoring-mark/instant-tutoring-mark.component';

import { EditTeacherProfileComponent } from './components/teacher-profiles/edit-teacher-profile/edit-teacher-profile.component';
import { EditGeneralProfileComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-general-profile/edit-general-profile.component';
import { EditEducationComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-education/edit-education.component';
import { EditCertificationComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-certification/edit-certification.component';
import { EditWorkExperenceComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-work-experence/edit-work-experence.component';
import { EditIntroductionComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-introduction/edit-introduction.component';
import { EditLanguageComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-language/edit-language.component';

import { TeacherChangePasswordComponent } from './components/teacher-change-password/teacher-change-password.component';

import {CdkTableModule} from '@angular/cdk/table';
import { 
  // MatDialogModule,MatFormFieldModule,MatInputModule
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule, } from '@angular/material';
 

@NgModule({
  exports: [
    //MatDialogModule,MatFormFieldModule,CdkTableModule,MatInputModule
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
  ],
  declarations: []
})
export class UsingMaterialModule {}

@NgModule({
  imports: [
    CommonModule,
    TeacherRouterModule,
    RouterModule,
    FormsModule,
    SharedModule,
    UsingMaterialModule,
    TranslateModule
  ],
  declarations: [
    GeneralProfileComponent,
    LanguageComponent,
    EducationComponent,
    CertificationComponent,
    WorkExperienceComponent,
    IntroductionComponent,
    ApplicationComponent,
    GeneralAvailabilityComponent,
    TeacherListComponent, 
    TeacherFilterComponent,
    TeacherVideoComponent, 
    TeacherCalendarComponent, 
    TeacherDetailsComponent, 
    TeacherClassesComponent,
    TeacherRatingComponent,
    TeacherProfilesComponent, 
    AvailabilityComponent, 
    ClassRatesComponent, 
    CoursesComponent, 
    CreateCoursesComponent, 
    TeacherNotificationComponent, 
    InstantTutoringMarkComponent,
    CourseDetailsComponent,
    EditTeacherProfileComponent,
    EditGeneralProfileComponent, 
    EditEducationComponent, 
    EditCertificationComponent, 
    EditWorkExperenceComponent, 
    EditIntroductionComponent,
    EditLanguageComponent,
    TeacherChangePasswordComponent
  ],
  exports: [
    TeacherFilterComponent,
    TeacherVideoComponent, 
    TeacherCalendarComponent, 
    TeacherClassesComponent,
    TeacherRatingComponent,
    InstantTutoringMarkComponent
  ]
})
export class TeacherModule { }
