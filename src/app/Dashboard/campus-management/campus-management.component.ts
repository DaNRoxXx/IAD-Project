import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SigninService } from "../../Services/signin.service";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-campus-management',
  templateUrl: './campus-management.component.html',
  styleUrls: ['./campus-management.component.css']
})
export class CampusManagementComponent implements OnInit {

  response: String;
  response2: String;
  response3: String;
  getCampuses: any[];
  getTeachers: any[];
  getStaffs: any[];
  editRow: any;

  constructor(private router: Router, private http: Http) { }

  addCampus(cName: HTMLInputElement, cAddress: HTMLInputElement): void {
    let self = this;
    if (cName.value == "" || cAddress.value == "") {
      self.response = "All fields are required.";
      document.getElementById('response').className = "alert alert-danger";
    }
    else {
      this.http.post("http://localhost:3000/campuses", { name: cName.value, address: cAddress.value },
        new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
          if (res.status === 201) {
            document.getElementById('response').className = "alert alert-success";
            self.response = "Campus successfully added.";
            self.showCampuses();
          }
        })
      cName.value = "";
      cAddress.value = "";
    }
  }

  showCampuses() {
    let self = this;
    this.http.get("http://localhost:3000/campuses/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getCampuses = res.json();
        //console.log(self.getCampuses);
      })
  }

  showTeachers() {
    let self = this;
    this.http.get("http://localhost:3000/teachers/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getTeachers = res.json();
        //console.log(self.getTeachers[0].Campuses);
      })
  }

  showStaffs() {
    let self = this;
    this.http.get("http://localhost:3000/staffs/get", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getStaffs = res.json();
        //console.log(self.getStaffs[0].User);
      })
  }

  assignCampusTeacher(Teacher: any, Campus: any) {
    let self = this;
    //console.log(Teacher);
    //console.log(Campus);
    this.http.post("http://localhost:3000/teachers/assign", { TeacherId: Teacher, CampusId: Campus },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        self.showTeachers();
      })
    document.getElementById('response2').className = "alert alert-success";
    self.response2 = "Teacher successfully assigned.";
  }

  assignCampusStaff(Staff: any, Campus: any) {
    let self = this;
    //console.log(Staff);
    //console.log(Campus);
    this.http.post("http://localhost:3000/staffs/assign", { StaffId: Staff, CampusId: Campus },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        self.showStaffs();
      })
    document.getElementById('response3').className = "alert alert-success";
    self.response3 = "Staff ssuccessfully assigned..";
  }

  editCampus(data: any) {
    let self = this;
    self.editRow = 0;
    this.http.put("http://localhost:3000/campuses/edit", { id: data.id, name: data.name, address: data.address },
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
    this.showTeachers();
    this.showStaffs();
  }

}
