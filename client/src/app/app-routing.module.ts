import {MapComponent} from './map/map.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileCardComponent} from "./profile-card/profile-card.component";
import {ParalaxComponent} from './paralax/paralax.component';
import {SearchNewsComponent} from './search-news/search-news.component';
import {UserCrisisComponent} from "./user-crisis/user-crisis.component";
import {AuthSecureService} from "./services/auth-secure.service";
import {UserVerificationComponent} from "./user-verification/user-verification.component";
import {PoliceGaurdService} from "./services/police-gaurd.service";
import {ChartsComponent} from "./charts/charts.component";


const routes: Routes = [
  {path: '', component: ParalaxComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthSecureService]},
  {path: 'profile-card', component: ProfileCardComponent, canActivate: [AuthSecureService]},
  {path: 'maps', component: MapComponent},
  {path: 'crisis', component: UserCrisisComponent, canActivate: [AuthSecureService]},
  {path: 'users', component: UserVerificationComponent, canActivate: [PoliceGaurdService]},
  {path: 'search-news', component: SearchNewsComponent},
  {path: 'charts', component: ChartsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
