import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  userData: SocialUser;

  constructor(private dataservice: DataService, private formBuilder: FormBuilder, private router: Router, private authService: AuthDataService, private socialAuth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.valid) {
      let userData: any = this.authService.validateUserData(this.loginForm.value);
      if (userData) {
        this.authService.persistLoggedUserData(userData);
        this.router.navigate(["dashboard"]);
      } else this.dataservice.showToaster('Invalid Credentials..')
    }
    else {
      this.dataservice.showToaster('Invalid Credentials....')
    }

  }

  socialLogin() {
    this.router.navigate(["dashboard"]);
  }

  signInWithFB(): void {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.socialAuth.authState.subscribe((user) => {
      // this.user = user;
      // this.loggedIn = (user != null);
      console.log(user);
    });
  }

  signInWithGoogle() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    setTimeout(() => {
      this.socialAuth.authState.subscribe((user) => {
        // this.user = user;
        // this.loggedIn = (user != null);
        // console.log(user);
        sessionStorage.setItem('name', user.name);
        sessionStorage.setItem('id', user.id)
        sessionStorage.setItem('email', user.email)

        this.userData = user;
        if (this.userData) {

          let data = {
            name: user.name,
            userID: user.id,
            email: user.email,
            provider: user.provider
          }
          this.dataservice.userSave(data).subscribe((res: any) => {
            this.router.navigate(["dashboard"]);
          })

        }
      });
    }, 1000);
  }

}
