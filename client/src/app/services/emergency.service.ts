import {Injectable} from '@angular/core';
import {UserCrisis} from "../models/userInfo";
import {AuthenticationService} from "./authentication.service";
import {timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  constructor(private auth: AuthenticationService) {
  }

  locationSubscribe;
  error;
  userCrisis: UserCrisis = {
    Lat: '',
    Long: '',
    Location: '',
    offenceType: 'Threat',
    offenceDescription: 'Feeling Unsafe',
  };

  track() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        (position) => {
          this.userCrisis.Lat = position.coords.latitude.toString();
          this.userCrisis.Long = position.coords.longitude.toString();
          this.setCurrentPostition(this.userCrisis);
          this.locationSubscribe = timer(1000, 30000).subscribe(() => this.track());
        }, (error) => {
          console.log('Geolocation error: ' + error);
        });
    } else {
      console.log('Geolocation not supported in this browser');
    }
  }

  setCurrentPostition(userLoc) {
    this.userCrisis.Lat = userLoc.Lat;
    this.userCrisis.Long = userLoc.Long;
    this.userCrisis.Location = `(${userLoc.Lat},${userLoc.Long})`;
    this.auth.sendSos(this.userCrisis).subscribe((success) => {
      console.log(success);
    });
  }

  stopTracking() {
    this.locationSubscribe.unsubscribe();
  }
}
