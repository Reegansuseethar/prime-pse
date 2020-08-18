import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private dataservice:DataService ,private formBuilder: FormBuilder, private router: Router,private authService:AuthService) { }

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
      let userData:any = this.authService.validateUserData(this.loginForm.value);
      if(userData){
        this.authService.persistLoggedUserData(userData);
        this.router.navigate(["dashboard"]);
      }else this.dataservice.showToaster('Invalid Credentials..')
    }
    else {
      this.dataservice.showToaster('Invalid Credentials....')
    }

  }

}
