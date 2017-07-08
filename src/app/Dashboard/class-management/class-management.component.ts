import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SigninService } from "../../Services/signin.service";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {

  response: String;
  getCampuses: any[];
  getClasses: any[];
  editRow: any;

  constructor(private router: Router, private http: Http) { }

  addClass(clName: HTMLInputElement, clFee: HTMLInputElement, Campus: any): void {
    let self = this;
    //console.log(Campus.value);
    this.http.post("http://localhost:3000/campuses/class", { name: clName.value, fee: clFee.value, campid: Campus.value },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        if (res.status === 201) {
          document.getElementById('response').className = "alert alert-success";
          self.response = "Class successfully added.";
          setTimeout(function () {
            self.showClasses();
          }, 500);
          //self.showClasses();
        }
      })

    clName.value = "";
    clFee.value = "";
  }

  showClasses() {
    let self = this;
    this.http.get("http://localhost:3000/classes/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getClasses = res.json();
        //console.log(self.getClasses);
      })
  }

  showCampuses() {
    let self = this;
    this.http.get("http://localhost:3000/campuses/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getCampuses = res.json();
        //console.log(self.getCampuses);
      })
  }

  editClass(Class: any) {
    let self = this;
    self.editRow = 0;
    this.http.put("http://localhost:3000/classes/edit", { id: Class.id, name: Class.name, fee: Class.fee },
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
    this.showCampuses();
    this.showClasses();
  }

}
