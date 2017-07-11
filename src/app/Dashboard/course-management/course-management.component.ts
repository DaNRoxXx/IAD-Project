import { Component, OnInit } from '@angular/core';
import { SigninService } from "../../Services/signin.service";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {

  response: any;
  response2: any;
  response3: any;
  editRow: any;
  getClasses: any[];
  getCourses: any[];
  getTeachers: any[];
  getSections: any[];
  getTeachings: any[];

  constructor(private router: Router, private http: Http) { }

  addCourse(coName: HTMLInputElement) {
    let self = this;
    this.http.post("http://localhost:3000/courses", { name: coName.value },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        if (res.status === 201) {
          document.getElementById('response').className = "alert alert-success";
          self.response = "Course successfully added.";
          coName.value = "";
          setTimeout(function () {
            self.showCourses();
          }, 500);
        }
      })
  }

  assignClassCourse(courseId: any, classId: any) {
    let self = this;
    let DropdownList = (document.getElementById("class")) as HTMLSelectElement;
    let DropdownList2 = (document.getElementById("course")) as HTMLSelectElement;
    let SelectedIndex = DropdownList.selectedIndex;

    this.http.post("http://localhost:3000/classes/courses", { courseId: courseId.value, classId: classId.value },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        if (res.status === 201) {
          document.getElementById('response2').className = "alert alert-success";
          self.response2 = "Course successfully assigned.";
          setTimeout(function () {
            self.showCourses();
          }, 500);
        }
      })
    if (SelectedIndex != 0) {
      DropdownList.selectedIndex = 0;
      DropdownList2.selectedIndex = 0;
    }
  }

  showCourses() {
    let self = this;
    this.http.get("http://localhost:3000/courses/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getCourses = res.json();
        //console.log(self.getCourses);
      })
  }

  showClasses() {
    let self = this;
    this.http.get("http://localhost:3000/classes/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getClasses = res.json();
        //console.log(self.getClasses);
      })
  }

  showTeachers() {
    let self = this;
    this.http.get("http://localhost:3000/teachers/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getTeachers = res.json();
        //console.log(self.getTeachers[0].Campuses);
      })
  }

  showSections() {
    let self = this;
    this.http.get("http://localhost:3000/sections/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getSections = res.json();
        //console.log(self.getSections);
      })
  }

  showTeachings() {
    let self = this;
    this.http.get("http://localhost:3000/teachers/getallcourses", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getTeachings = res.json();
        //console.log(self.getTeachings);
      })
  }

  assignT2CS(teacher: any, courseId: any, sectionObj: any) {
    let self = this;
    //console.log(teacher.id);
    //console.log(teacher.User.firstName);
    //console.log(courseId.value);
    //console.log(sectionObj.Class.name);
    this.http.post("http://localhost:3000/teachers/addcourse", {
      teacherId: teacher.id, firstName: teacher.User.firstName, lastName: teacher.User.lastName,
      courseId: courseId.value, className: sectionObj.Class.name, sectionId: sectionObj.id
    }, new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
      setTimeout(function () {
        self.showTeachings();
      }, 500);
    })
    document.getElementById('response3').className = "alert alert-success";
    self.response3 = "Course & Section successfully assigned.";
  }

  editCourse(Course: any) {
    let self = this;
    self.editRow = 0;
    this.http.put("http://localhost:3000/courses/edit", { id: Course.id, name: Course.name },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
      })
  }

  toggle(val) {
    this.editRow = val;
  }

  logOut() {
    SigninService.session.currentUser = null;
    this.router.navigate([""]);
  }

  dashboard(): void {
    this.router.navigate(["dashboard"]);
  }

  user(): void {
    this.router.navigate(["user"]);
  }

  campus(): void {
    this.router.navigate(["campus"]);
  }

  class(): void {
    this.router.navigate(["class"]);
  }

  course(): void {
    this.router.navigate(["course"]);
  }

  exam(): void {
    this.router.navigate(["exam"]);
  }

  fees(): void {
    this.router.navigate(["fees"]);
  }

  announce(): void {
    this.router.navigate(["announce"]);
  }

  alumini(): void {
    this.router.navigate(["alumini"]);
  }

  account(): void {
    this.router.navigate(["account"]);
  }

  report(): void {
    this.router.navigate(["report"]);
  }

  ngOnInit() {
    this.showClasses();
    this.showCourses();
    this.showTeachers();
    this.showSections();
    this.showTeachings();
  }

}
