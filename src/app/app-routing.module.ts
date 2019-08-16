import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard } from './guards/auth/public.guard';
import { IsRecruiterGuard } from './guards/recruiter/is-recruiter.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: './commons/commons.module#CommonsModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [ PublicGuard ]
  },
  {
    path: 'recruiter',
    loadChildren: './recruiter/recruiter.module#RecruiterModule',
    canActivate: [ IsRecruiterGuard ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
