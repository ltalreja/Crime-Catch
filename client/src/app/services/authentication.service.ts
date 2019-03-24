import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenPayload, TokenResponse} from "../models/token";
import {UserCrisis, UserInfo} from "../models/userInfo";
//import 'rxjs/add/operate/map';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private payload = new HttpParams();
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    sessionStorage.setItem('user-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = sessionStorage.getItem('user-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.sessionStorage.removeItem('user-token');
    this.router.navigateByUrl('/');
  }

  public getUserInfo(): UserInfo {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserInfo();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  public isPolice(): boolean {

    const user = this.getUserInfo();
    if (user && user.role === 'Police') {
      return true;
    } else {
      return false;
    }


  }

  public isUser(): boolean {

    const user = this.getUserInfo();
    if (user && user.role === 'User') {
      return true;
    } else {
      return false;
    }


  }

  private request(method: 'post' | 'get' | 'put' | 'delete', type: 'login' | 'register' | 'profile' | 'crimes' | 'crisis' | 'users' | 'allData', user?): Observable<any> {
    let base;

    switch (type) {
      case 'login':
      case 'register':
        base = this.http.post(`/api/${type}`, user);
        break;
      case 'profile':
        base = method === 'put' ?
          this.http.put(`/api/${type}`, user, {headers: {Authorization: `Bearer ${this.getToken()}`}}) :
          this.http.get(`/api/${type}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
        break;
      case 'crimes':
        base = this.http.get(`/api/${type}`, {params: this.payload, headers: {Authorization: `Bearer ${this.getToken()}`}});
        break;
      case 'crisis':
        base = this.http.post(`/api/${type}`, user, {headers: {Authorization: `Bearer ${this.getToken()}`}});
        break;
      case 'users':
        if (method === 'put') {
          base = this.http.put(`/api/${type}`, user, {headers: {Authorization: `Bearer ${this.getToken()}`}});
        } else if (method === 'get') {
          base = this.http.get(`/api/${type}`, {
            params: this.payload,
            headers: {Authorization: `Bearer ${this.getToken()}`}
          });
        } else if (method === 'delete') {
          base = this.http.delete(`/api/${type}`, {
            params: this.payload,
            headers: {Authorization: `Bearer ${this.getToken()}`}
          });
        }
        break;
      case 'allData':
        base = this.http.get(`/api/${type}`);
		break;
    }

    return base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    console.log(this);
    return this.request('post', 'login', user);
  }

  public viewProfile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public updateProfile(userInfo: UserInfo): Observable<any> {
    return this.request('put', 'profile', userInfo);
  }

  public getCrimes(params: HttpParams): Observable<any> {
    this.payload = params;
    return this.request('get', 'crimes');
  }

  public sendSos(userCrisis: UserCrisis): Observable<any> {
    return this.request('post', 'crisis', userCrisis);
  }

  public fetchUsers(params: HttpParams): Observable<any> {
    this.payload = params;
    return this.request('get', 'users');
  }

  public verifyUser(userInfo: UserInfo): Observable<any> {
    return this.request('put', 'users', userInfo);
  }

  public deleteUser(params: HttpParams): Observable<any> {
    this.payload = params;
    return this.request('delete', 'users');
  }
  public getAllData(): Observable<any> {
    return this.request('get', 'allData');
  }

}
