// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   error: string = '';
//   success: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit() {
//   const payload = {
//     email: this.email,
//     password: this.password,
//   };

//   this.authService.login(payload).subscribe({
//     next: (res) => {
//       this.error = '';
//       this.success = 'Login successful!';
//       localStorage.setItem('token', res.access_token);
//       localStorage.setItem('user', JSON.stringify({ email: this.email })); // ✅ Save user email
//       this.router.navigate(['/search']);
//     },
//     error: () => {
//       this.success = '';
//       this.error = 'Invalid email or password.';
//     },
//   });
// }

// }



import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service'; // ✅ Import LoaderService
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService // ✅ Inject LoaderService
  ) {}

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.loader.show(); // ✅ Show loader

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.loader.hide(); // ✅ Hide loader
        this.error = '';
        this.success = 'Login successful!';
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify({ email: this.email }));
        this.router.navigate(['/search']);
      },
      error: () => {
        this.loader.hide(); // ✅ Hide loader
        this.success = '';
        this.error = 'Invalid email or password.';
      },
    });
  }
}
