import {Component, OnInit} from '@angular/core';
import {EmergencyService} from "../services/emergency.service";
// import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

@Component({
  selector: 'app-user-crisis',
  templateUrl: './user-crisis.component.html',
  styleUrls: ['./user-crisis.component.scss']
})
export class UserCrisisComponent implements OnInit {
  edited: Boolean = false;

  constructor(private emService: EmergencyService) {
  }

  ngOnInit() {

  }

  sos(flag) {
    if (flag) {
      this.emService.track();
      this.edited = !this.edited;
    } else {
      this.emService.stopTracking();
      this.edited = !this.edited;
    }
  }
}
