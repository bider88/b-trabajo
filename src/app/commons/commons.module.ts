import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonsRoutingModule } from './commons-routing.module';
import { HomeComponent } from './components/home/home.component';

const COMPONENTS = [
  HeaderComponent
];

const MODULES = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  FormsModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    HomeComponent
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  imports: [
    CommonsRoutingModule,
    ...MODULES
  ],
})
export class CommonsModule { }
