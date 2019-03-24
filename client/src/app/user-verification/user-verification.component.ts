import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../models/userInfo";
import {AuthenticationService} from "../services/authentication.service";
import {HttpParams} from "@angular/common/http";
import {accountStatus} from "../models/token";

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  usersList: Array<UserInfo> = [];
  params: HttpParams;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersList = [];
    this.params = new HttpParams().set('role', 'User').set('accountStatus', 'New');
    this.auth.fetchUsers(this.params).subscribe((response) => {
      this.usersList = response;
      console.log(this.usersList);
    }, (error) => {
      console.log(error);
    })
  }

  verifyUser(user) {
    let userInfo: UserInfo = {
      _id: user._id,
      email: user.email,
      accountStatus: accountStatus.Verified,
      exp: user.exp,
      iat: user.iat
    };
    this.auth.verifyUser(userInfo).subscribe((response) => {
      this.fetchUsers();
    }, (error) => {
      console.log(error);
    })
  }

  deleteUser(user) {
    this.params = new HttpParams().set('_id', user._id);
    this.auth.deleteUser(this.params).subscribe((response) => {
      this.fetchUsers();
    }, (error) => {
      console.log(error);
    })
  }
}
