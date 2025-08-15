// frontend/src/app/pages/loader/loader.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important for *ngIf
import { LoaderService } from '../../services/loader.service'; // Path to your LoaderService

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule], // Make sure CommonModule is imported for *ngIf
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'] // Link to your CSS
})
export class LoaderComponent {
  constructor(public loader: LoaderService) { } // 'public' makes it accessible in template
}