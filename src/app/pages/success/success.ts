// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-success',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="text-center p-4">
//       <h2>🎉 Order Placed Successfully!</h2>
//       <p>We’ve received your order. You’ll get an email once the documents are ready.</p>
//       <button (click)="goToStatus()">View My Orders</button>
//     </div>
//   `,
//   styles: [`
//     div { max-width: 600px; margin: auto; text-align: center; }
//     button { margin-top: 20px; padding: 10px 20px; background: #3399cc; color: white; border: none; border-radius: 5px; }
//   `]
// })
// export class SuccessComponent {
//   constructor(private router: Router) {}
//   goToStatus() {
//     this.router.navigate(['/status']);
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrls: ['./success.css'],
})
export class SuccessComponent {
  constructor(private router: Router) {}
  goToStatus() {
    this.router.navigate(['/status']);
  }
}
