import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SpecializationService } from '../../../shared/services/specialization.service';
import { AuthService } from '../../services/auth.service';
import { Specialization } from '../../../shared/models/specialization.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  specializations: Specialization[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      specializationId: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations(): void {
    this.isLoading = true;
    this.specializationService.getSpecializations()
      .subscribe({
        next: (data) => {
          this.specializations = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching specializations:', error);
          this.errorMessage = 'Unable to load specializations. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.markFormGroupTouched(this.registrationForm);
      return;
    }

    this.isLoading = true;
    const userData = {
      login: this.registrationForm.value.login,
      password: this.registrationForm.value.password,
      specializationId: this.registrationForm.value.specializationId
    };

    this.authService.register(userData)
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      });
  }


  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
