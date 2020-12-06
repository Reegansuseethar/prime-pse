import { Injectable } from '@angular/core';
import { authData } from '../../model/constant/mockData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private route: Router) { }
  validateUserData(formValue) {
    let user = Object.keys(authData).find((userKey) => {
      return authData[userKey].name == formValue.username && authData[userKey].password == formValue.password;
    });
    return authData[user];
  }

  persistLoggedUserData(formValue): any {
    sessionStorage.setItem("userData", JSON.stringify(formValue));
  }

  getLoggedInUserData(): any {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData;
  }

  isLoggedInUserIsAdmin(): any {
    let userData = this.getLoggedInUserData();
    if (userData && userData.permission == "all") {
      return true;
    } else return false;
  }

  doLogout(): any {
    sessionStorage.clear();
    this.route.navigate(['login']);
  }
}
