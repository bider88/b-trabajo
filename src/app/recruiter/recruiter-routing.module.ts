import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterHomeComponent } from './pages/recruiter-home/recruiter-home.component';


const routes: Routes = [
  { path: 'home', component: RecruiterHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
