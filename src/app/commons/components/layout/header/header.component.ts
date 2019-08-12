import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

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

  constructor() { }

  ngOnInit() {
  }

  showMenuRecluiter(): boolean {
    return false;
  }

  isRecluiter(): boolean {
    return false;
  }

  logout() {
    $('.dropdown-menu').removeClass('show');
    // this.authService.logout();
  }

}
