import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../User/User";
import { SigninService } from "../../Services/signin.service";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SigninService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private signin: SigninService, private http: Http) { }

  user: User;
  response: string;

  sign(email: HTMLInputElement, userPassword: HTMLInputElement): void {
    this.user = { username: email.value, password: userPassword.value };
     if (this.signin.checkUsername(this.user) == true) {
       SigninService.session.currentUser = email.value;
       this.router.navigate(["dashboard"]);
     }
     else {
       document.getElementById('response').className = "alert alert-danger";
       this.response = "Invalid Username or Password.";
     }
    //this.http.get("http://localhost:3000/signup/login", new Headers({ 'Content-type': 'application/json' })).map(response => response.json());
    /*this.http.post("http://localhost:3000/signup/login", { email: email.value, password: userPassword.value }, new Headers({ 'Content-type': 'application/json' })).toPromise()
      .then(function (res) {
        console.log(res);
      })*/
  }

  signup(): void {
    this.router.navigate(["signup"]);
  }

  ngOnInit() {
    if (SigninService.session.currentUser != null) {
      this.router.navigate(["dashboard"]);
    }
  }

}
