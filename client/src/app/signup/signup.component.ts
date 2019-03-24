import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { accountStatus, role, TokenPayload } from '../models/token';
import {UserInfo} from '../models/userInfo';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide = false;

  selectedCountry: string;
  countries: string[] = ['India', 'USA'];
  selectedCity: string;
  cities: string[] = ['Mumbai', 'Boston'];
  selectedState: string;
  states: string[] = ['AL', 'MA'];


  credentials: TokenPayload = {
    email: '',
    name: {
      firstName: '',
      lastName: ''
    },
    password: '',
    role: role.User,
    accountStatus: accountStatus.New,
    address: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      country: ''
    },
    emergencyContact: {
      name: '',
      email: '',
    }
  };
  constructor(private auth: AuthenticationService, private router: Router) {
  }

  getCellPhoneErrorMessage() {
    return this.signupForm.controls.cellphone.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.cellphone.hasError('pattern') ? 'Not a valid Number' : '';
  }

  getSSNErrorMessage() {
    return this.signupForm.controls.ssn.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.ssn.hasError('pattern') ? 'Not a valid SSN' : '';
  }

  getZIPErrorMessage() {
    return this.signupForm.controls.zipcode.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.zipcode.hasError('pattern') ? 'Not a valid Zip Code' : '';
  }

  getEmailErrorMessage() {
    return this.signupForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.signupForm.controls.password.hasError('required') ? 'You must enter a value' :
      this.signupForm.controls.password.hasError('minlength') ? 'Password must be minimum 8 characters long' : '';
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      ssn: new FormControl('' , [<any>Validators.required, <any>Validators.pattern(/^[0-9]{9}$/)]),
      firstname: new FormControl('', [<any>Validators.required]),
      lastname: new FormControl('', [<any>Validators.required]),
      address1: new FormControl('', [<any>Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [<any>Validators.required]),
      state: new FormControl('', [<any>Validators.required]),
      country: new FormControl('', [<any>Validators.required]),
      zipcode: new FormControl('', [<any>Validators.required, <any>Validators.pattern(/^[0-9]{5}$/)]),
      email: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
      confirmPassword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
      cellphone: new FormControl('', [<any>Validators.required,
                 <any>Validators.pattern(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)]),
      emerName: new FormControl('', [<any>Validators.required]),
      emerEmail: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      });

  }

  register() {
    this.credentials.ssn = this.signupForm.get('ssn').value;
    this.credentials.name.firstName = this.signupForm.get('firstname').value;
    this.credentials.name.lastName = this.signupForm.get('lastname').value;
    this.credentials.address.street = this.signupForm.get('address1').value;
    this.credentials.address.addressLine2 = this.signupForm.get('address2').value;
    this.credentials.address.city = this.signupForm.get('city').value;
    this.credentials.address.state = this.signupForm.get('state').value;
    this.credentials.address.country = this.signupForm.get('country').value;
    this.credentials.address.zip = this.signupForm.get('zipcode').value;
    this.credentials.phoneNo = this.signupForm.get('cellphone').value;
    this.credentials.email = this.signupForm.get('email').value;
    this.credentials.password = this.signupForm.get('password').value;
    this.credentials.emergencyContact.name = this.signupForm.get('emerName').value;
    this.credentials.emergencyContact.email = this.signupForm.get('emerEmail').value;
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      console.error(err);
      alert(err);
    });
  }
}
