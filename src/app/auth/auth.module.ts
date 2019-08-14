import { NgModule } from '@angular/core';
import { CommonsModule } from '../commons/commons.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginRecruiterComponent } from './components/login-recruiter/login-recruiter.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupRecruiterComponent } from './components/signup-recruiter/signup-recruiter.component';
import { LoginComponent } from './components/login/login.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';


@NgModule({
  declarations: [LoginUserComponent, LoginRecruiterComponent, SignupComponent, SignupRecruiterComponent, LoginComponent, SignupUserComponent],
  imports: [
    AuthRoutingModule,
    CommonsModule
  ]
})
export class AuthModule { }
