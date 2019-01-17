import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenPayload, TokenResponse} from "../models/token";
import {UserInfo} from "../models/userInfo";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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

  private request(method: 'post' | 'get' | 'put', type: 'login' | 'register' | 'profile', user?): Observable<any> {
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
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public viewProfile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public updateProfile(userInfo: UserInfo): Observable<any> {
    return this.request('put', 'profile', userInfo);
  }

}
