import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {StudentGuard} from '../../services/student.guard';

import { StudentListComponent } from './components/student-list/student-list.component';
import {StudentProfileFirstComponent} from './components/student-profile-first/student-profile-first.component';
import {StudentProfileSecondComponent} from './components/student-profile-second/student-profile-second.component';
import { StudentProfileThirdComponent } from './components/student-profile-third/student-profile-third.component';
import { StudentProfileFourthComponent } from './components/student-profile-fourth/student-profile-fourth.component';

import { StudentLessonComponent } from './components/student-lesson/student-lesson.component';
import { ScheduledLessonComponent } from './components/student-lesson/components/scheduled-lesson/scheduled-lesson.component';
import { UnscheduledLessonComponent } from './components/student-lesson/components/unscheduled-lesson/unscheduled-lesson.component';
import { FavouriteTeacherComponent } from './components/student-lesson/components/favourite-teacher/favourite-teacher.component';
import { PastClassesComponent } from './components/student-lesson/components/past-classes/past-classes.component';
import { ViewEditLessonsComponent } from './components/student-lesson/components/view-edit-lessons/view-edit-lessons.component';
import { StudentLessonsTabsComponent } from './components/student-lesson/components/student-lessons-tabs/student-lessons-tabs.component';
import { AddLessonTopicComponent } from './components/student-lesson/components/add-lesson-topic/add-lesson-topic.component';

import { FriendsGroupComponent } from './components/friends-group/friends-group.component';
import { GroupListComponent } from './components/friends-group/components/group-list/group-list.component';
import { FriendListComponent } from './components/friends-group/components/friend-list/friend-list.component';
import { RequestListComponent } from './components/friends-group/components/request-list/request-list.component';
import { GroupDetailComponent } from './components/friends-group/components/group-detail/group-detail.component';
import { FriendGroupTabsComponent } from './components/friends-group/components/friend-group-tabs/friend-group-tabs.component';
import { InviteFriendComponent } from './components/friends-group/components/invite-friend/invite-friend.component';
import { OwnerGroupComponent } from './components/friends-group/components/owner-group/owner-group.component';
import { FriendGroupListComponent } from './components/friends-group/components/friend-group-list/friend-group-list.component';
import { FriendTutorListComponent } from './components/friends-group/components/friend-tutor-list/friend-tutor-list.component';
import { FriendOfFriendComponent } from './components/friends-group/components/friend-of-friend/friend-of-friend.component';

import { StudyGroupComponent } from './components/study-group/study-group.component';
import { CreateStudyGroupComponent } from './components/study-group/components/create-study-group/create-study-group.component';
import { StudyGroupDetailsComponent } from './components/study-group/components/study-group-details/study-group-details.component';
import { StudyGroupListComponent } from './components/study-group/components/study-group-list/study-group-list.component';

import { BulletinBoardComponent } from './components/bulletin-board/bulletin-board.component';
import { BulletinHotComponent } from './components/bulletin-board/components/bulletin-hot/bulletin-hot.component';
import { BulletinCommentsComponent } from './components/bulletin-board/components/bulletin-comments/bulletin-comments.component';
import { BulletinTabsComponent } from './components/bulletin-board/components/bulletin-tabs/bulletin-tabs.component';
import { BulletinCreateComponent } from './components/bulletin-board/components/bulletin-create/bulletin-create.component';
import { EditStudyGroupComponent } from './components/study-group/components/edit-study-group/edit-study-group.component';

import { FindTopicComponent } from './components/find-topic/find-topic.component';
import { FindTopicTabsComponent } from './components/find-topic/components/find-topic-tabs/find-topic-tabs.component';
import { StudyTopicComponent } from './components/find-topic/components/study-topic/study-topic.component';

import { PraticeRoomComponent } from './components/pratice-room/pratice-room.component';
import { CreatePraticeRoomComponent } from './components/pratice-room/create-pratice-room/create-pratice-room.component';
import { JoinPracticeRoomComponent } from './components/pratice-room/join-practice-room/join-practice-room.component';


import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { MyClassesComponent } from './components/settings/my-classes/my-classes.component';
import { StudentNotificationComponent } from './components/settings/student-notification/student-notification.component';
import { StudentFullDetailsComponent } from './components/student-full-details/student-full-details.component';
import { StudentChangePasswordComponent } from './components/settings/student-change-password/student-change-password.component';
import { FaqsComponent } from './components/settings/faqs/faqs.component';
import { WriteUsComponent } from './components/settings/write-us/write-us.component';
import { HelpCenterComponent } from './components/settings/help-center/help-center.component';

const studentRoutes: Routes = [
   // { path:'', redirectTo : 'student-profile', component:StudentListComponent },    
    { path:'profile/:id', component:StudentProfileFirstComponent },
    { path:'student-profile-second-step', component:StudentProfileSecondComponent },
    { path:'student-profile-third-step',component:StudentProfileThirdComponent},
    { path:'student-profile-fourth-step',component:StudentProfileFourthComponent},
    { path:'student-profile', component:StudentListComponent,canActivate:[StudentGuard],
      children : [
        { path:'', redirectTo : 'lessons', component:StudentLessonComponent }, 
        { path:'lessons', component:StudentLessonComponent,
          children : [
            { path:'', redirectTo : 'lesson-views', component:ScheduledLessonComponent }, 
            { path:'lesson-views', component:StudentLessonsTabsComponent,
              children : [
                { path:'', redirectTo : 'scheduled-lesson', component:ScheduledLessonComponent }, 
                { path:'scheduled-lesson', component:ScheduledLessonComponent },
                { path:'unscheduled-lesson', component:UnscheduledLessonComponent },
                { path:'past-classes', component:PastClassesComponent },
                { path:'favourite-teacher', component:FavouriteTeacherComponent },
              ],
            },
            { path:'view-edit-lesson', component:ViewEditLessonsComponent,
              children : [                
                { path:'add-lesson', component:AddLessonTopicComponent },
              ]
            },
           
          ],
        },
        { path:'friends-group', component:FriendsGroupComponent,
          children : [
            { path:'', redirectTo : 'tabs', component:FriendGroupTabsComponent},
            { path:'tabs', component:FriendGroupTabsComponent,
              children : [
                { path:'', redirectTo : 'groups', component:GroupListComponent},
                { path:'groups', component:GroupListComponent},
                { path:'friends', component:FriendListComponent},
                { path:'requests', component:RequestListComponent},
                { path:'owner-group', component:OwnerGroupComponent},
              ],
            },                        
            { path:'group-details/:id', component:GroupDetailComponent},
            { path:'invite-friend', component:InviteFriendComponent},
            { path:'friend-group', component:FriendGroupListComponent},
            { path:'friend-tutor/:id', component:FriendTutorListComponent},
            { path:'friend-of-friend', component:FriendOfFriendComponent},
          ],
        }, 

        { path:'classes', component:MyClassesComponent},
        { path: 'student-notification', component: StudentNotificationComponent},
        { path:'student-details/:id', component:StudentFullDetailsComponent}, 
        { path:'student-password', component:StudentChangePasswordComponent},
        { path:'help-center', component:HelpCenterComponent,
          children : [
            { path:'', redirectTo : 'faqs', component:FaqsComponent },
            { path:'faqs', component:FaqsComponent},  
            { path:'write-us', component:WriteUsComponent},            
          ]
        },              
      ],
    },
    { path:'study-group', component:StudyGroupComponent, 
      children : [
        { path:'', redirectTo : 'study-group-list', component:StudyGroupListComponent },
        { path:'study-group-list', component:StudyGroupListComponent},
        { path:'study-group-detail/:id', component:StudyGroupDetailsComponent},
        { path:'create-study-group', component:CreateStudyGroupComponent,  canActivate: [StudentGuard]},
        { path:'edit-study-group/:id', component:EditStudyGroupComponent,  canActivate: [StudentGuard]},
      ],
    },
    { path:'bulletin-board', component:BulletinBoardComponent,
      children : [
        { path:'', redirectTo : 'bulletin-tabs', component:BulletinTabsComponent },
        { path:'bulletin-tabs', component:BulletinTabsComponent,
          children : [
            { path:'', redirectTo : 'bulletin-board', component:BulletinHotComponent },
            { path:'bulletin-board', component:BulletinHotComponent},
          ],
        },
        { path:'comments/:id', component:BulletinCommentsComponent} ,
        { path:'create', component:BulletinCreateComponent,canActivate:[StudentGuard]} 
      ],
    },
    { path:'find-topic', component:FindTopicComponent,
      children : [
        { path:'', redirectTo : 'tabs', component:FindTopicTabsComponent },
        { path:'tabs', component:FindTopicTabsComponent,
          children : [
            { path:'', redirectTo : 'study', component:StudyTopicComponent },
            { path:'study', component:StudyTopicComponent},
          ],
        },      
      ],
    },
    { path:'practice-room', component:PraticeRoomComponent}, 
    { path:'practice-room/:id', component:PraticeRoomComponent}, 
    { path:'join-practice-room/:id',component:JoinPracticeRoomComponent},
    { path:'practice-create', component:CreatePraticeRoomComponent,canActivate:[StudentGuard]},
    { path:'practice-create/:id/:groupName/:groupSubject', component:CreatePraticeRoomComponent,canActivate:[StudentGuard]}, 
    { path:'edit-profile', component:EditProfileComponent,canActivate:[StudentGuard]},
    
    
    
    

]

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  declarations: []
})
export class StudentRouterModule {}
