import { Component, OnInit } from '@angular/core';
import { SigninService } from "../../Services/signin.service";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.css']
})
export class ExamManagementComponent implements OnInit {

  response: any;
  getCourses: any[];
  getExams: any[];

  constructor(private router: Router, private sigin: SigninService, private http: Http) { }

  addExam(courseId: HTMLInputElement, eName: HTMLInputElement, eDate: HTMLInputElement, eTime: HTMLInputElement) {
    let self = this;
    this.http.post("http://localhost:3000/teachings/exam/", { courseId: courseId.value, name: eName.value, date: eDate.value, time: eTime.value },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        if (res.status === 201) {
          document.getElementById('response').className = "alert alert-success";
          self.response = "Exam successfully added.";
          //coName.value = "";
          setTimeout(function () {
            //self.showCourses();
          }, 500);
        }
      })
  }

  showCourses() {
    let self = this;
    this.http.get("http://localhost:3000/courses/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getCourses = res.json();
        //console.log(self.getCourses);
      })
  }

  showExams() {
    let self = this;
    this.http.get("http://localhost:3000/teachings/exam/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getExams = res.json();
        //console.log(self.getExams);
      })
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
    this.showCourses();
    this.showExams();
  }

}
