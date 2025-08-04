// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// declare var Razorpay: any;

// @Component({
//   selector: 'app-checkout',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './checkout.html',
// })
// export class CheckoutComponent implements OnInit {
//   selectedCompanies: any[] = [];
//   totalAmount: number = 0;

//   constructor(private auth: AuthService, private router: Router) {}

//   ngOnInit() {
//     const stored = localStorage.getItem('selectedCompanies');
//     this.selectedCompanies = stored ? JSON.parse(stored) : [];

//     if (this.selectedCompanies.length === 0) {
//       alert('No companies selected!');
//       this.router.navigate(['/search']);
//     }

//     this.totalAmount = this.selectedCompanies.reduce(
//       (sum, company) => sum + company.price,
//       0
//     );
//   }

//   payNow() {
//     const receipt = 'receipt_' + new Date().getTime();

//     this.auth.createRazorpayOrder(this.totalAmount * 100, receipt).subscribe({
//       next: (res) => {
//         const options = {
//           key: 'rzp_live_sGlGqcEBCeFQhm', // ✅ Replace with your actual Razorpay key
//           amount: res.amount,
//           currency: 'INR',
//           name: 'Company Docs',
//           description: 'Document Purchase',
//           order_id: res.id,
//           handler: (response: any) => {
//             // ✅ Payment success
//             this.auth.createOrderAfterPayment(this.selectedCompanies, response).subscribe({
//               next: () => {
//                 localStorage.removeItem('selectedCompanies');
//                 this.router.navigate(['/success']);
//               },
//               error: () => {
//                 alert('Failed to create order after payment');
//               },
//             });
//           },
//           prefill: {
//             email: this.auth.getUserEmail(),
//           },
//           theme: {
//             color: '#3399cc',
//           },
//         };

//         const rzp = new Razorpay(options);
//         rzp.open();
//       },
//       error: () => {
//         alert('Failed to initiate Razorpay order');
//       },
//     });
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// declare var Razorpay: any;

// @Component({
//   selector: 'app-checkout',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './checkout.html',
//   styleUrls: ['./checkout.css'],
// })
// export class CheckoutComponent implements OnInit {
//   selectedCompanies: any[] = [];
//   totalAmount: number = 0;

//   constructor(private auth: AuthService, private router: Router) {}

//   ngOnInit() {
//     const stored = localStorage.getItem('selectedCompanies');
//     this.selectedCompanies = stored ? JSON.parse(stored) : [];

//     if (this.selectedCompanies.length === 0) {
//       alert('No companies selected!');
//       this.router.navigate(['/search']);
//     }

//     this.totalAmount = this.selectedCompanies.reduce(
//       (sum, company) => sum + company.price,
//       0
//     );
//   }

//   payNow() {
//     const receipt = 'receipt_' + new Date().getTime();

//     this.auth.createRazorpayOrder(this.totalAmount * 100, receipt).subscribe({
//       next: (res) => {
//         const options = {
//           key: 'rzp_test_Ov5CJaljgVxnv2', // ✅ Replace with your Razorpay key
//           amount: res.amount,
//           currency: 'INR',
//           name: 'Company Docs',
//           description: 'Document Purchase',
//           order_id: res.id,
//           handler: (response: any) => {
//             // ✅ Payment successful, now create order
//             this.auth.createOrderAfterPayment(this.selectedCompanies, response).subscribe({
//               next: () => {
//                 localStorage.removeItem('selectedCompanies');
//                 this.router.navigate(['/success']);
//               },
//               error: () => {
//                 alert('❌ Failed to create order after payment.');
//               },
//             });
//           },
//           prefill: {
//             email: this.auth.getUserEmail(),
//           },
//           theme: {
//             color: '#3399cc',
//           },
//         };

//         const rzp = new Razorpay(options);
//         rzp.open();
//       },
//       error: () => {
//         alert('❌ Failed to initiate Razorpay order');
//       },
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class CheckoutComponent implements OnInit {
  selectedCompanies: any[] = [];
  totalAmount: number = 0;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('selectedCompanies');
    this.selectedCompanies = stored ? JSON.parse(stored) : [];

    if (this.selectedCompanies.length === 0) {
      alert('No companies selected!');
      this.router.navigate(['/search']);
    }

    // totalAmount in INR
    this.totalAmount = this.selectedCompanies.reduce(
      (sum, company) => sum + company.price,
      0
    );
  }

  payNow() {
    const receipt = 'receipt_' + new Date().getTime();

    // Multiply by 100 to convert INR to paise
    const amountInPaise = this.totalAmount * 100;

    this.auth.createRazorpayOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt
    }).subscribe({
      next: (res) => {
        const options = {
          key: 'rzp_live_sGlGqcEBCeFQhm', // ✅ Replace with LIVE key when ready
          amount: res.amount, // in paise
          currency: 'INR',
          name: 'Company Docs',
          description: 'Document Purchase',
          order_id: res.id,
          handler: (response: any) => {
            // ✅ Payment success
            this.auth.createOrderAfterPayment(this.selectedCompanies, response).subscribe({
              next: () => {
                localStorage.removeItem('selectedCompanies');
                this.router.navigate(['/success']);
              },
              error: () => {
                alert('❌ Failed to create order after payment.');
              },
            });
          },
          prefill: {
            email: this.auth.getUserEmail(),
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      },
      error: () => {
        alert('❌ Failed to initiate Razorpay order');
      },
    });
  }
}
