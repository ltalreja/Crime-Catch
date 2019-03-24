import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenResponse} from '../models/token';
import {HttpParams} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CrimefilterService {

	private payload = new HttpParams();
	private token: string;

	constructor(private http: HttpClient, private router: Router) {}

	private getToken(): string {
		if (!this.token) {
			this.token = sessionStorage.getItem('user-token');
		}
		return this.token;
	}
  private saveToken(token: string): void {
    sessionStorage.setItem('user-token', token);
    this.token = token;
  }

	private request(method: 'get', type: 'crimes' | 'streets' | 'offense', user ? ): Observable < any > {
		let base;
		switch (type) {
			case 'crimes':
				base = this.http.get(`/api/${type}`, {
					params: this.payload,
					headers: {
						Authorization: `Bearer ${this.getToken()}`
					}
				});
				break;
			case 'streets':
				base = this.http.get(`/api/${type}`);
				break;
			case 'offense':
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


	public getCrimes(params: HttpParams): Observable < any > {
		this.payload = params;
		return this.request('get', 'crimes');
	}
	public getstreets(): Observable < any > {
		return this.request('get', 'streets');
	}
	public getoffense(): Observable < any > {
		return this.request('get', 'offense');
	}

}
