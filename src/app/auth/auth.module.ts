import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginRecruiterComponent } from './components/login-recruiter/login-recruiter.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupRecruiterComponent } from './components/signup-recruiter/signup-recruiter.component';


@NgModule({
  declarations: [LoginUserComponent, LoginRecruiterComponent, SignupComponent, SignupRecruiterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
