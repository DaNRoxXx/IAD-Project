import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { routes } from "./app.routing";
import { LoginComponent } from './Login/login/login.component';
import { NavigationComponent } from './Dashboard/navigation/navigation.component';
import { SigninService } from "./Services/signin.service";
import { SignupComponent } from './Login/signup/signup.component';
import { CampusManagementComponent } from './Dashboard/campus-management/campus-management.component';
import { ClassManagementComponent } from './Dashboard/class-management/class-management.component';
import { CourseManagementComponent } from './Dashboard/course-management/course-management.component';
import { ExamManagementComponent } from './Dashboard/exam-management/exam-management.component';
import { FeesManagementComponent } from './Dashboard/fees-management/fees-management.component';
import { AnnouncementsComponent } from './Dashboard/announcements/announcements.component';
import { AluminiManagementComponent } from './Dashboard/alumini-management/alumini-management.component';
import { AccountManagementComponent } from './Dashboard/account-management/account-management.component';
import { ReportingComponent } from './Dashboard/reporting/reporting.component';
import { UserManagementComponent } from './Dashboard/user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    SignupComponent,
    CampusManagementComponent,
    ClassManagementComponent,
    CourseManagementComponent,
    ExamManagementComponent,
    FeesManagementComponent,
    AnnouncementsComponent,
    AluminiManagementComponent,
    AccountManagementComponent,
    ReportingComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
    //RouterModule,
    //RouterModule.forRoot(AppRoutes)
  ],
  providers: [SigninService],
  bootstrap: [AppComponent]
})
export class AppModule { }
