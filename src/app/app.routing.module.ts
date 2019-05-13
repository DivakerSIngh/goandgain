import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/commonpages/not-found/not-found.component';

const appRoutes: Routes = [    
    {path:'', loadChildren:'./modules/commonpages/commonpages.module#CommonpagesModule'},
    {path:'teacher', loadChildren:'./modules/teacher/teacher.module#TeacherModule'},
    {path:'student', loadChildren:'./modules/student/student.module#StudentModule'},
    { path:'**',  component:NotFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  declarations: []
})
export class AppRoutingModule {}
