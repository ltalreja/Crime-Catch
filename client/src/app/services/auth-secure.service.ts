import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthSecureService {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
