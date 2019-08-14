import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginRecruiterComponent } from './components/login-recruiter/login-recruiter.component';
import { SignupRecruiterComponent } from './components/signup-recruiter/signup-recruiter.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';


const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'login-recruiter', component: LoginRecruiterComponent },
  { path: 'signup', component: SignupUserComponent },
  { path: 'signup-recruiter', component: SignupRecruiterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
