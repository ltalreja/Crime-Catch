import {HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {TokenPayload} from "../models/token";
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  hide = false;

  params: HttpParams;
  parameter: Array<Map<String, String>>;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls.password.hasError('required') ? 'You must enter a value' :
      this.loginForm.controls.password.hasError('minlength') ? 'Password must be minimum 8 characters long' : '';
  }

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
    });

  }

  login() {
    this.credentials.email = this.loginForm.get('email').value;
    this.credentials.password = this.loginForm.get('password').value;
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      console.error(err);
    });
  }
}
