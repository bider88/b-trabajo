import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AfterAuthService {

  onCompletedLogin = new EventEmitter();
  onCompletedLogout = new EventEmitter();
  onErrorLoginOrSignUP = new EventEmitter();

  constructor() { }
}
