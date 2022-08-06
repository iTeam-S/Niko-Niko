import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LogInComponent } from './components/log-in/log-in.component';


@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LogInComponent
  ]
})
export class AuthModule { }
