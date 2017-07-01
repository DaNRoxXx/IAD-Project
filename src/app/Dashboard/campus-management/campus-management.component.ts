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

  constructor(private router: Router, private http: Http) { }

  addCampus(cName: HTMLInputElement, cAddress: HTMLInputElement): void {
    this.http.post("http://localhost:3000/campuses", { name: cName.value, address: cAddress.value }, new Headers({ 'Content-type': 'application/json' })).toPromise()
      .then(function (res) {
        console.log(res);
      })
      cName.value = "";
      cAddress.value = "";
      alert("Successfully Added!");
    //this.router.navigate([""]);
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
  }

}
