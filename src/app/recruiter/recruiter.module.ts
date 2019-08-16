import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterHomeComponent } from './pages/recruiter-home/recruiter-home.component';


@NgModule({
  declarations: [RecruiterHomeComponent],
  imports: [
    CommonModule,
    RecruiterRoutingModule
  ]
})
export class RecruiterModule { }
