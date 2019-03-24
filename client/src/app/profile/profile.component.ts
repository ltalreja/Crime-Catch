import { Address } from './../models/token';
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserInfo} from '../models/userInfo';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: UserInfo;
  updateForm: FormGroup;
  selectedCountry: string;
  countries: string[] = ['India', 'USA'];
  selectedCity: string;
  cities: string[] = ['Mumbai', 'Boston'];
  selectedState: string;
  states: string[] = ['AL', 'MA'];

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  getCellPhoneErrorMessage() {
    return this.updateForm.controls.cellphone.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.cellphone.hasError('pattern') ? 'Not a valid Number' : '';
  }

  getSSNErrorMessage() {
    return this.updateForm.controls.ssn.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.ssn.hasError('pattern') ? 'Not a valid SSN' : '';
  }

  getZIPErrorMessage() {
    return this.updateForm.controls.zipcode.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.zipcode.hasError('pattern') ? 'Not a valid Zip Code' : '';
  }

  getEmailErrorMessage() {
    return this.updateForm.controls.email.hasError('required') ? 'You must enter a value' :
      this.updateForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  toggle() {
    const control1 = this.updateForm; control1.disabled ? control1.enable() : control1.disable();
    this.updateForm.get('ssn').disable();
    this.updateForm.get('email').disable();
  }

  ngOnInit() {
      this.updateForm = new FormGroup({
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
      cellphone: new FormControl('', [<any>Validators.required,
                 <any>Validators.pattern(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)]),
      emerName: new FormControl('', [<any>Validators.required]),
      emerEmail: new FormControl('', [<any>Validators.required, <any>Validators.email]),
      });

      this.toggle();

      this.auth.viewProfile().subscribe(user => {
      this.details = user;
      this.updateForm.setValue({
        ssn : user.ssn,
        email : user.email,
        firstname : user.name.firstName,
        lastname : user.name.lastName,
        address1 : user.address.street,
        address2: user.address.addressLine2 == null ? '' : user.address.addressLine2,
        state : user.address.state,
        country : user.address.country,
        city : user.address.city,
        zipcode : user.address.zip,
        cellphone : user.phoneNo,
        emerName : user.emergencyContact.name,
        emerEmail : user.emergencyContact.email,
  });

      }, (err) => {
      console.error(err);
    });
  }

  update() {
    this.details.name.firstName = this.updateForm.get('firstname').value;
    this.details.name.lastName = this.updateForm.get('lastname').value;
    this.details.address.street = this.updateForm.get('address1').value;
    this.details.address.addressLine2 = this.updateForm.get('address2').value;
    this.details.address.city = this.updateForm.get('city').value;
    this.details.address.state = this.updateForm.get('state').value;
    this.details.address.country = this.updateForm.get('country').value;
    this.details.address.zip = this.updateForm.get('zipcode').value;
    this.details.phoneNo = this.updateForm.get('cellphone').value;
    this.details.emergencyContact.name = this.updateForm.get('emerName').value;
    this.details.emergencyContact.email = this.updateForm.get('emerEmail').value;
    this.auth.updateProfile(this.details).subscribe(user => {
    this.details = user;
    }, (err) => {
      console.error(err);
      alert(err);
    });
  }

}
