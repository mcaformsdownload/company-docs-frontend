import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { LoaderComponent } from './pages/loader/loader.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('frontend');
}
