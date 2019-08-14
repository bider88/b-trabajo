import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsRoutingModule } from './commons-routing.module';
import { HomeComponent } from './components/home/home.component';

import { NgSpinKitModule } from 'ng-spin-kit';

const COMPONENTS = [
  HeaderComponent
];

const MODULES = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  NgSpinKitModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    HomeComponent
  ],
  imports: [
    CommonsRoutingModule,
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ]
})
export class CommonsModule { }
