// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-status',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './status.html',
//   styleUrls: ['./status.css'],
// })
// export class StatusComponent implements OnInit {
//   orders: any[] = [];
//   loading = true;
//   error = '';

//   constructor(private auth: AuthService) {}

//   ngOnInit() {
//     this.auth.getMyOrders().subscribe({
//       next: (res) => {
//         this.orders = res;
//         this.loading = false;
//       },
//       error: () => {
//         this.error = 'Failed to fetch orders';
//         this.loading = false;
//       }
//     });
//   }

//   downloadZip(url: string) {
//     window.open(url, '_blank');
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.html',
  styleUrls: ['./status.css'],
})
export class StatusComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getMyOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch orders';
        this.loading = false;
      }
    });
  }

  downloadZip(url: string) {
    window.open(url, '_blank');
  }
}
