import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AfterAuthService } from 'src/app/services/common/after-auth.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  firstName = '';
  urlImageProfile = '';
  id = '';

  constructor(
    private authService: AuthService,
    private afterAuth: AfterAuthService,
  ) { }

  ngOnInit() {
    this.renewToken();
    this.start();
    this.afterLogin();
    this.afterLogout();
  }

  showMenuRecluiter(): boolean {
    return !this.isLoggedIn || this.authService.currentUser.role === 'RECRUITER_ROLE';
  }

  isRecluiter(): boolean {
    if (this.authService.currentUser) {
      return this.authService.currentUser.role === 'RECRUITER_ROLE';
    }
    return false;
  }

  logout() {
    $('.dropdown-menu').removeClass('show');
    this.authService.logout();
  }

  afterLogin() {
    this.afterAuth.onCompletedLogin.subscribe(
      res => {
        if (res) {
          this.start();
        }
      }
    );
  }

  afterLogout() {
    this.afterAuth.onCompletedLogout.subscribe(
      res => {
        if (res) {
          this.isLoggedIn = false;
          this.firstName = '';
          this.urlImageProfile = '';
        }
      }
    );
  }

  start() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.id = this.authService.currentUser._id;

      this.firstName = this.authService.currentUser.firstName;
      const img = this.authService.currentUser.img || 'noimage';
      const token = localStorage.getItem('token');

      this.urlImageProfile = `${environment.apiUrl}/image/profile/${img}?token=${token}`;
    } else {
      this.authService.logout();
    }
  }

  renewToken() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService.getNewToken(this.authService.currentUser._id);

    } else {
      this.authService.logout();
    }
  }

}
