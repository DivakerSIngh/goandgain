import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { BecomeTutorComponent } from './become-tutor/become-tutor.component';
import { StudentModule } from './../student/student.module';
import { StudyGroupComponent } from './../student/components/study-group/study-group.component';
import { BulletinBoardComponent } from './../student/components/bulletin-board/bulletin-board.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const commonpageRoutes: Routes = [
    { path:'', redirectTo:'home', component:LandingPageComponent },    
    { path:'home',  component:LandingPageComponent },
    { path:'become-a-tutor',  component:BecomeTutorComponent },
    { path:'study-group', component:StudyGroupComponent },
    { path:'bulletin-board', component:BulletinBoardComponent },
    { path:'forgot/:id', component:ForgotPasswordComponent },
   
]

@NgModule({
  imports: [
    StudentModule,
    RouterModule.forChild(commonpageRoutes)
  ],
  declarations: []
})
export class CommonPageRouterModule {}
