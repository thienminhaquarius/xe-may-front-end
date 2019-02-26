import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';

interface User {
  email: string,
  name: string,
  password: string
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private registerUrl = this.apiUrl + '/register';
  private loginUrl = this.apiUrl + '/login';
  private logoutUrl = this.apiUrl + '/logout';

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  onRegister(user: User) {
    const request = JSON.stringify(
      { name: user.name, email: user.email, password: user.password }
    );
    return this.http.post(this.registerUrl, request, httpOptions);
  }

  onLogin(user) {
    const request = JSON.stringify(
      { email: user.email, password: user.password }
    );
    return this.http.post(this.loginUrl, request, httpOptions);
  }

  onLogout(HttpHeadersJwt) {
    return this.http.post(this.logoutUrl, {}, HttpHeadersJwt);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    return;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    return localStorage.removeItem('token');
  }

  getUserInfo() {
    if (this.isAuhtenticated) {
      let token = this.getToken();
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
  }

  isAuhtenticated(): boolean {
    // get the token
    const token: string = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }


}