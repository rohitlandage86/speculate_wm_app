import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthModule { }
