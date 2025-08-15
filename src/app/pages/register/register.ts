import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service'; // ✅ Import LoaderService
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  otp: string = '';
  otpSent: boolean = false;
  error: string = '';
  success: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService // ✅ Inject LoaderService
  ) {}

  // sendOtp() {
  //   if (!this.email || !this.password) {
  //     this.error = 'Please enter email and password first';
  //     return;
  //   }

  //   this.loader.show(); // ✅ Show loader

  //   this.authService.sendOtp(this.email).subscribe({
  //     next: () => {
  //       this.loader.hide(); // ✅ Hide loader
  //       this.otpSent = true;
  //       this.success = 'OTP sent to email';
  //       this.error = '';
  //     },
  //     error: () => {
  //       this.loader.hide(); // ✅ Hide loader
  //       this.success = '';
  //       this.error = 'Failed to send OTP';
  //     },
  //   });
  // }

  // verifyOtpAndRegister() {
  //   const payload = {
  //     email: this.email,
  //     password: this.password,
  //     otp: this.otp,
  //   };

  //   this.loader.show(); // ✅ Show loader

  //   this.authService.verifyOtp(payload).subscribe({
  //     next: () => {
  //       this.loader.hide(); // ✅ Hide loader
  //       this.success = 'Registration successful!';
  //       this.error = '';
  //       this.router.navigate(['/login']);
  //     },
  //     error: () => {
  //       this.loader.hide(); // ✅ Hide loader
  //       this.success = '';
  //       this.error = 'Invalid OTP or email already exists';
  //     },
  //   });
  // }

  // <!-- -----------------------25/07/2025---------------- -->
  sendOtp() {
    this.passwordMismatch = false;

    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      // this.error = 'Passwords do not match';
      return;
    }

    this.passwordMismatch = false;

    this.loader.show(); // ✅ Show loader

    this.authService.sendOtp(this.email).subscribe({
      next: () => {
        this.loader.hide(); // ✅ Hide loader
        this.otpSent = true;
        this.success = 'OTP sent to email';
        this.error = '';
      },
      error: () => {
        this.loader.hide(); // ✅ Hide loader
        this.success = '';
        this.error = 'Failed to send OTP';
      },
    });
  }
  verifyOtpAndRegister() {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      // this.error = 'Passwords do not match';
      return;
    }

    this.passwordMismatch = false;

    const payload = {
      email: this.email,
      password: this.password,
      otp: this.otp,
    };

    this.loader.show(); // ✅ Show loader

    this.authService.verifyOtp(payload).subscribe({
      next: () => {
        this.loader.hide(); // ✅ Hide loader
        this.success = 'Registration successful!';
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loader.hide(); // ✅ Hide loader
        this.success = '';
        this.error = 'Invalid OTP or email already exists';
      },
    });
  }

}
