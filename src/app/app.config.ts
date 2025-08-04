// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login';
// import { RegisterComponent } from './pages/register/register';
// import { SearchComponent } from './pages/search/search';
// import { StatusComponent} from './pages/status/status';
// import { SuccessComponent } from './pages/success/success';
// import { CheckoutComponent } from './pages/checkout/checkout';
// import { AuthGuard } from './guards/auth.guard';

// export const routes: Routes = [
//   { path: '', redirectTo: 'search', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
//   { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
//   { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
//   { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
// ];

// export const appConfig = {
//   providers: [provideRouter(routes),
//     provideHttpClient(),
//   ],
// };

 
// frontend/src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http'; // <-- IMPORTANT: Import these two
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { SearchComponent } from './pages/search/search';
import { StatusComponent} from './pages/status/status';
import { SuccessComponent } from './pages/success/success';
import { CheckoutComponent } from './pages/checkout/checkout';
import { AuthGuard } from './guards/auth.guard';
import { LoaderInterceptor } from './interceptors/loader.interceptor'; // <-- IMPORTANT: Import your interceptor
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuard] },
  {path: 'forgot-password', component:ForgotPasswordComponent}
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    // Call provideHttpClient() here. This should be the ONLY place it's called in your application.
    provideHttpClient(),
    // Provide your LoaderInterceptor here, right alongside provideHttpClient()
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true, // Crucial for allowing multiple interceptors if you add more later
    },
  ],
};