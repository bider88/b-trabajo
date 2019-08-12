import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  imports: [
    ...MODULES
  ],
})
export class CommonsModule { }
