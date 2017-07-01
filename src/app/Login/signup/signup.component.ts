import { Component, OnInit } from '@angular/core';
import { userInfo } from "../../User/UserData";
import { Router } from "@angular/router";
import { User } from "../../User/User";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }

  newuser: User;

  signup(userName: HTMLInputElement, email: HTMLInputElement, userPassword: HTMLInputElement): void {
    userInfo.push({ username: userName.value, password: userPassword.value });
    this.http.post("http://localhost:3000/signup", { userName: userName.value, email: email.value, password: userPassword.value }, new Headers({ 'Content-type': 'application/json' })).toPromise()
      .then(function (res) {
        //console.log(res);
      })
    this.router.navigate([""]);
  }

  ngOnInit() {
  }

}
