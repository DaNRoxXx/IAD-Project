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
  getCampuses: any[];
  getTeachers: any[];
  getTeachersCampus: any[];
  editRow: any;

  constructor(private router: Router, private http: Http) { }

  addCampus(cName: HTMLInputElement, cAddress: HTMLInputElement): void {
    let self = this;
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

    /*this.http.get("http://localhost:3000/teachers/getcampus", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        self.getTeachersCampus = res.json();
        //console.log(self.getTeachersCampus[0].Campuses[0].name);

        for (var key in self.getTeachersCampus) {
          self.test[key] = "";
          for (var key2 in self.getTeachersCampus[key].Campuses) {
            //console.log(self.getTeachersCampus[key].Campuses[key2].name);
            self.test[key] += self.getTeachersCampus[key].Campuses[key2].name + ", ";
            
          }
          console.log(self.test[key]);
        }
        
      })*/
  }

  assignCampus(Teacher: any, Campus: any) {
    let self = this;
    console.log(Teacher);
    console.log(Campus);
    this.http.post("http://localhost:3000/teachers/assign", { TeacherId: Teacher, CampusId: Campus },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        self.showTeachers();
      })
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
  }

}
