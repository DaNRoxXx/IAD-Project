import { Component, OnInit } from '@angular/core';
import { SigninService } from "../../Services/signin.service";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private router: Router, private sigin: SigninService, private http: Http) { }

  response: String;
  //body: any;
  getData: any[];
  bodyLength: Number;

  addUser(fName: HTMLInputElement, lName: HTMLInputElement, gender: HTMLInputElement, dob: HTMLInputElement): void {
    let self = this;

    if (fName.value == "" && lName.value == "" && gender.value == "" && dob.value == "") {
      self.response = "All fields are required.";
      document.getElementById('response').className = "alert alert-danger";
    }
    else {
      this.http.post("http://localhost:3000/users", { firstName: fName.value, lastName: lName.value, gender: gender.value, dob: dob.value },
        new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
          //console.log(res);
          if (res.status === 201) {
            document.getElementById('response').className = "alert alert-success";
            self.response = "User successfully added.";
            self.showUsers();
          }
        })
    }
    fName.value = "";
    lName.value = "";
    gender.value = "";
    dob.value = "";
    //alert("Successfully Added!");
    //this.router.navigate([""]);
  }

  showUsers() {
    let self = this;
    this.http.get("http://localhost:3000/users/getall", new Headers({ 'Content-type': 'application/json' }))
      .toPromise().then(function (res) {
        //self.bodyLength = Object.keys(res.json()).length;
        //console.log(self.bodyLength);
        //console.log(res.json()[0].id);
        //self.body = res.text();
        self.getData = res.json();
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
    this.showUsers();
  }

}
