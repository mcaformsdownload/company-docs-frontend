
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://mca-download-proj-production.up.railway.app/';

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, payload);
  }

  register(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, payload);
  }

  searchCompany(cin: string): Observable<Company> {
    return this.http.post<Company>(`${this.BASE_URL}/search-company`, { cin });
  }
  sendOtp(email: string): Observable<any> {
  return this.http.post(`${this.BASE_URL}/send-otp`, { email });
}

verifyOtp(data: { email: string; password: string; otp: string }): Observable<any> {
  return this.http.post(`${this.BASE_URL}/verify-otp`, data);
}
// --------------------25/07/25------------------
sendForgotOtp(email: string): Observable<any> {
  return this.http.post(`${this.BASE_URL}/forgot-password/send-otp`, { email });
}

resetPasswordWithOtp(data: { email: string; otp: string; new_password: string }): Observable<any> {
  return this.http.post(`${this.BASE_URL}/forgot-password/reset`, data);
}
// ---------------------------------------------------
  // createRazorpayOrder(amount: number, receipt: string): Observable<any> {
  //   return this.http.post<any>(`${this.BASE_URL}/create-razorpay-order`, {
  //     amount,
  //     currency: 'INR',
  //     receipt
  //   });
  // }

  createRazorpayOrder(data: { amount: number, currency: string, receipt: string }): Observable<any> {
  return this.http.post<any>(`${this.BASE_URL}/create-razorpay-order`, data);
}

  createOrderAfterPayment(companies: any[], razorpayResponse: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/create-order`, {
      cin_list: companies.map(c => c.cin),
      razorpay_id: razorpayResponse.razorpay_payment_id,
      email: this.getUserEmail()
    });
  }

  getUserEmail(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.sub || '';
    } catch {
      return '';
    }
  }

  getMyOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(`${this.BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
