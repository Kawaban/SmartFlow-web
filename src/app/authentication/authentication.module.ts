import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent
  ]
})
export class AuthenticationModule { }
