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
