import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GeneralProfileComponent } from './components/general-profile/general-profile.component';
import { LanguageComponent } from './components/language/language.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationComponent } from './components/certification/certification.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ApplicationComponent } from './components/application/application.component';
import { GeneralAvailabilityComponent } from './components/general-availability/general-availability.component';

import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';

import { TeacherProfilesComponent } from './components/teacher-profiles/teacher-profiles.component';
import { AvailabilityComponent } from './components/teacher-profiles/admin/availability/availability.component';
import { ClassRatesComponent } from './components/teacher-profiles/admin/class-rates/class-rates.component';
import { CoursesComponent } from './components/teacher-profiles/admin/courses/courses.component';
import { CreateCoursesComponent } from './components/teacher-profiles/admin/create-courses/create-courses.component';
import { CourseDetailsComponent } from './components/teacher-profiles/admin/course-details/course-details.component';
import { TeacherNotificationComponent } from './components/teacher-profiles/settings/teacher-notification/teacher-notification.component';
import {TeacherGuard} from '../../services/teacher.guard';
import { EditTeacherProfileComponent } from './components/teacher-profiles/edit-teacher-profile/edit-teacher-profile.component';
import { EditGeneralProfileComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-general-profile/edit-general-profile.component';
import { EditEducationComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-education/edit-education.component';
import { EditCertificationComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-certification/edit-certification.component';
import { EditWorkExperenceComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-work-experence/edit-work-experence.component';
import { EditIntroductionComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-introduction/edit-introduction.component';
import { EditLanguageComponent } from './components/teacher-profiles/edit-teacher-profile/components/edit-language/edit-language.component';

import { TeacherChangePasswordComponent } from './components/teacher-change-password/teacher-change-password.component';


const teacherRoutes: Routes = [
    // { path:'', redirectTo:'generalprofile',  component:GeneralProfileComponent },
    { path:'generalprofile/:id',  component:GeneralProfileComponent },
    { path:'language', component: LanguageComponent},
    { path:'education', component: EducationComponent},
    { path:'certification', component: CertificationComponent},
    { path:'work-experience', component: WorkExperienceComponent},
    { path:'introduction', component: IntroductionComponent},
    { path:'application', component: ApplicationComponent},
    { path:'details/:id', component: TeacherDetailsComponent},
    { path:'listing', component: TeacherListComponent},
    { path:'general-availability', component: GeneralAvailabilityComponent},
    { path : 'profile', component : TeacherProfilesComponent, canActivate:[TeacherGuard],
      children: [
        { path:'', redirectTo : 'availabilityU', component:AvailabilityComponent},
        { path : 'availability', component : AvailabilityComponent},
        { path : 'class-rates', component : ClassRatesComponent},
        { path : 'courses', component : CoursesComponent},
        { path : 'create-courses', component : CreateCoursesComponent},
        { path : 'course-details/:id', component : CourseDetailsComponent},
        { path : 'teacher-notification', component : TeacherNotificationComponent},
        { path : 'teacher-password', component : TeacherChangePasswordComponent},        
      ], 
    }  ,
    { path : 'edit-profile', component : EditTeacherProfileComponent,canActivate:[TeacherGuard],
      children: [
        { path:'', redirectTo : 'general', component:EditGeneralProfileComponent},
        { path : 'general', component : EditGeneralProfileComponent},
        { path : 'education', component : EditEducationComponent},
        { path : 'certification', component : EditCertificationComponent},
        { path : 'work-experience', component : EditWorkExperenceComponent},
        { path : 'introduction', component : EditIntroductionComponent},
        { path : 'language', component : EditLanguageComponent},
      ]
    },      
]

@NgModule({
  imports: [
    RouterModule.forChild(teacherRoutes)
  ],
  declarations: []
})
export class TeacherRouterModule {}