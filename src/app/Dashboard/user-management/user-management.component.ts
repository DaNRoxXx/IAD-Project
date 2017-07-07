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
  getData: any[];
  bodyLength: Number;
  editRow: any;

  addUser(fName: HTMLInputElement, lName: HTMLInputElement, gender: HTMLInputElement, dob: HTMLInputElement): void {
    let self = this;
    let DropdownList = (document.getElementById("roles")) as HTMLSelectElement;
    let SelectedIndex = DropdownList.selectedIndex;

    if (fName.value == "" && lName.value == "" && gender.value == "" && dob.value == "") {
      self.response = "All fields are required.";
      document.getElementById('response').className = "alert alert-danger";
    }
    else {
      switch (SelectedIndex) {
        case 0:
          document.getElementById('response').className = "alert alert-warning";
          self.response = "Please select a role.";
          break;
        case 1:
          this.http.post("http://localhost:3000/teachers", { firstName: fName.value, lastName: lName.value, gender: gender.value, dob: dob.value },
            new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
              if (res.status === 201) {
                document.getElementById('response').className = "alert alert-success";
                self.response = "Teacher successfully added.";
                self.showUsers();
              }
            })
          break;
        case 2:
          this.http.post("http://localhost:3000/students", { firstName: fName.value, lastName: lName.value, gender: gender.value, dob: dob.value },
            new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
              if (res.status === 201) {
                document.getElementById('response').className = "alert alert-success";
                self.response = "Student successfully added.";
                self.showUsers();
              }
            })
          break;
        case 3:
          this.http.post("http://localhost:3000/staffs", { firstName: fName.value, lastName: lName.value, gender: gender.value, dob: dob.value },
            new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
              if (res.status === 201) {
                document.getElementById('response').className = "alert alert-success";
                self.response = "Staff successfully added.";
                self.showUsers();
              }
            })
          break;
        default:
          document.getElementById('response').className = "alert alert-danger";
          self.response = "ERROR!";
          break;
      }
      self.showUsers();
    }
    if (SelectedIndex != 0) {
      fName.value = "";
      lName.value = "";
      gender.value = "";
      dob.value = "";
      DropdownList.selectedIndex = 0;
    }
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

  editUser(data: any) {
    let self = this;
    self.editRow = 0;
    this.http.put("http://localhost:3000/users/edit", { id: data.id, firstName: data.firstName, lastName: data.lastName, gender: data.gender, dob: data.dob },
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
    this.showUsers();
  }

}
