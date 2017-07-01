import { Injectable } from '@angular/core';
import { User } from "../User/User";
import { userInfo } from "../User/UserData";

@Injectable()
export class SigninService {

  static session = { currentUser: null };

  constructor() { }

  checkUsername(user: User): boolean {
    for (var i = 0; i < userInfo.length; i++) {
      if (userInfo[i].username == user.username && userInfo[i].password == user.password) {
        SigninService.session.currentUser = user.username;
        //console.log(SigninService.session.currentUser);
        return true;
      }
    }
    return false;
  }

  getUsername(): string {
    console.log(SigninService.session.currentUser);
    return SigninService.session.currentUser;
  }

}
