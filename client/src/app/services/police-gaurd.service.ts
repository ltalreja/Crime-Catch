import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PoliceGaurdService {

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    if (this.auth.isUser()) {
      this.router.navigateByUrl('/');
    }

    return true;
  }
}
