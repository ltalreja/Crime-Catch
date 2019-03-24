import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileCardComponent} from './profile-card/profile-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatSelectModule,
  MatExpansionModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from "./services/authentication.service";
import {AuthSecureService} from "./services/auth-secure.service";
import {ParalaxComponent} from './paralax/paralax.component';
import {FooterComponent} from './footer/footer.component';
import {SearchNewsComponent} from './search-news/search-news.component';
import {SearchNewsServiceService} from './services/search-news-service.service';
import {UserVerificationComponent} from "./user-verification/user-verification.component";
import {UserCrisisComponent} from "./user-crisis/user-crisis.component";
import { ChartsComponent } from './charts/charts.component';

const modules = [MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule,MatExpansionModule];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProfileCardComponent,
    ParalaxComponent,
    FooterComponent,
    MapComponent,
    SearchNewsComponent,
    UserVerificationComponent,
    UserCrisisComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatExpansionModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatSelectModule,
    ...modules
  ],
  exports: [
    ...modules
  ],
  providers: [
    AuthenticationService,
    AuthSecureService,
    SearchNewsServiceService,
    SearchNewsComponent,
    ChartsComponent
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
