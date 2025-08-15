import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  step: number = 1;
  error: string = '';
  success: string = '';
  passwordMismatch: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  sendOtp() {
    if (!this.email) {
      this.error = 'Email is required';
      return;
    }

    this.auth.sendForgotOtp(this.email).subscribe({
      next: () => {
        this.success = 'OTP sent to email';
        this.error = '';
        this.step = 2;
      },
      error: () => {
        this.error = 'Failed to send OTP';
        this.success = '';
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    this.auth.resetPasswordWithOtp({
      email: this.email,
      otp: this.otp,
      new_password: this.newPassword
    }).subscribe({
      next: () => {
        this.success = 'Password reset successful!';
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Invalid OTP or failed to reset';
        this.success = '';
      }
    });
  }
}
