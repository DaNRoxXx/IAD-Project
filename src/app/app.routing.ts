import { LoginComponent } from "./Login/login/login.component";
import { NavigationComponent } from "./Dashboard/navigation/navigation.component";
import { SignupComponent } from "./Login/signup/signup.component";
import { CampusManagementComponent } from "./Dashboard/campus-management/campus-management.component";
import { ClassManagementComponent } from "./Dashboard/class-management/class-management.component";
import { CourseManagementComponent } from './Dashboard/course-management/course-management.component';
import { ExamManagementComponent } from './Dashboard/exam-management/exam-management.component';
import { FeesManagementComponent } from './Dashboard/fees-management/fees-management.component';
import { AnnouncementsComponent } from './Dashboard/announcements/announcements.component';
import { AluminiManagementComponent } from './Dashboard/alumini-management/alumini-management.component';
import { AccountManagementComponent } from './Dashboard/account-management/account-management.component';
import { ReportingComponent } from './Dashboard/reporting/reporting.component';
import { UserManagementComponent } from "./Dashboard/user-management/user-management.component";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

export const AppRoutes: any = [
    { path: "", component: LoginComponent },
    { path: "dashboard", component: NavigationComponent },
    { path: "user", component: UserManagementComponent },
    { path: "signup", component: SignupComponent },
    { path: "campus", component: CampusManagementComponent },
    { path: "class", component: ClassManagementComponent },
    { path: "course", component: CourseManagementComponent },
    { path: "exam", component: ExamManagementComponent },
    { path: "fees", component: FeesManagementComponent },
    { path: "announce", component: AnnouncementsComponent },
    { path: "alumini", component: AluminiManagementComponent },
    { path: "account", component: AccountManagementComponent },
    { path: "report", component: ReportingComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
 
export const AppComponents: any = [
    LoginComponent,
    NavigationComponent,
    SignupComponent,
    CampusManagementComponent
];