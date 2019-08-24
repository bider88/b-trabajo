import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AfterAuthService } from '../common/after-auth.service';
import { CredentialClass } from './../../models/credential.class';
import { UserClass } from 'src/app/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apirUrl: string;
  currentUser?: UserClass;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private afterAuth: AfterAuthService
  ) {
    this.apirUrl = environment.apiUrl;

    if (this.isLoggedIn() && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')).user;
      const { firstName, lastName, createdAt, email, img, role, _id } = user;
      this.currentUser = new UserClass(firstName, lastName, createdAt, email, null, img, role, _id);
    }
  }

  emailLogin(credentials: CredentialClass) {
    return this.httpClient.post<any>(`${this.apirUrl}/auth/login`, credentials);
  }

  emailSignUp(user: UserClass) {
    return this.httpClient.post<any>(`${this.apirUrl}/auth/signup`, user);
  }

  getNewToken(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        token: localStorage.getItem('token')
      })
    };
    return this.httpClient.get<any>(`${this.apirUrl}/auth/user/${id}`, httpOptions).subscribe(
      res => {
        const { firstName, lastName, createdAt, email, img, role, _id } = res.data;
        const token = res.token;
        const user = new UserClass(firstName, lastName, createdAt, email, '', img, role, _id);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ user }));
        this.currentUser = user;
        this.afterAuth.onCompletedLogin.emit(true);
      }, err => {
        this.logout();
        console.log(err);
        if (err.error.err.message === 'jwt expired') {
          this.logout();
        }
      }
    );
  }

  loginToken = (user: UserClass, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ user }));
    this.currentUser = user;
    if (this.currentUser.role === 'USER_ROLE') {
      this.router.navigateByUrl('/');
    } else if (this.currentUser.role === 'RECRUITER_ROLE') {
      this.router.navigateByUrl('/recruiter/home');
    }
    this.afterAuth.onCompletedLogin.emit(true);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = new UserClass(null, null, null, null, null, null, null, null);
    this.currentUser = null;
    this.router.navigateByUrl('/');
    this.afterAuth.onCompletedLogout.emit(true);
  }
}
