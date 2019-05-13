import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRouterModule } from './student.router';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import { SharedModule } from "../shared/shared.module";
import {TeacherService} from '../../services/teacher.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {TranslateModule} from 'ng2-translate';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentProfileFirstComponent } from './components/student-profile-first/student-profile-first.component';
import { StudentProfileSecondComponent } from './components/student-profile-second/student-profile-second.component';
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
import { EditStudyGroupComponent } from './components/study-group/components/edit-study-group/edit-study-group.component';

import { BulletinBoardComponent } from './components/bulletin-board/bulletin-board.component';
import { BulletinHotComponent } from './components/bulletin-board/components/bulletin-hot/bulletin-hot.component';
import { BulletinCommentsComponent } from './components/bulletin-board/components/bulletin-comments/bulletin-comments.component';
import { BulletinTabsComponent } from './components/bulletin-board/components/bulletin-tabs/bulletin-tabs.component';
import { BulletinCreateComponent } from './components/bulletin-board/components/bulletin-create/bulletin-create.component';

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
import { StudentStatusCalendarComponent } from './components/student-lesson/components/student-status-calendar/student-status-calendar.component';



import {
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
} from '@angular/material';





@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
  ],
  declarations: []
})
export class SliderMaterialModule {}

@NgModule({
  imports: [
    CommonModule,
    StudentRouterModule,
    RouterModule,
    FormsModule,
    SharedModule,
    SliderMaterialModule,
    NgbModule.forRoot(),
    TranslateModule
  ],
  declarations: [
    StudentListComponent,
    StudentProfileFirstComponent,
    StudentProfileSecondComponent,
    StudentProfileThirdComponent,
    StudentProfileFourthComponent,
    StudentLessonComponent, 
    ScheduledLessonComponent,
    UnscheduledLessonComponent,
    FavouriteTeacherComponent,
    PastClassesComponent,
    ViewEditLessonsComponent,
    StudentLessonsTabsComponent,
    AddLessonTopicComponent,
    FriendsGroupComponent,
    GroupListComponent,
    FriendGroupTabsComponent,
    OwnerGroupComponent,
    FriendListComponent,
    RequestListComponent,
    GroupDetailComponent,
    InviteFriendComponent,
    StudyGroupComponent,    
    CreateStudyGroupComponent,
    StudyGroupDetailsComponent,
    StudyGroupListComponent,
    EditStudyGroupComponent,
    BulletinBoardComponent,
    BulletinHotComponent,
    BulletinCommentsComponent,
    BulletinTabsComponent,
    BulletinCreateComponent,
    FindTopicComponent, 
    FindTopicTabsComponent, 
    StudyTopicComponent ,
    EditProfileComponent,
    MyClassesComponent,
    PraticeRoomComponent,
    CreatePraticeRoomComponent,
    JoinPracticeRoomComponent,
    StudentNotificationComponent,
    StudentFullDetailsComponent,
    StudentChangePasswordComponent,
    FaqsComponent, 
    WriteUsComponent, 
    HelpCenterComponent,
    StudentStatusCalendarComponent,
    FriendGroupListComponent, 
    FriendTutorListComponent, 
    FriendOfFriendComponent
  ],
  exports:[
    StudyGroupComponent,
    BulletinBoardComponent,
    StudentStatusCalendarComponent
  ],
  providers:[TeacherService]
})
export class StudentModule { }
