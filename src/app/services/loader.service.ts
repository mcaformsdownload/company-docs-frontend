// frontend/src/app/services/loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  show() {
    this.loading.next(true);
    console.log('LoaderService: show() called, isLoading is now TRUE'); // ADD THIS LINE
  }

  hide() {
    this.loading.next(false);
    console.log('LoaderService: hide() called, isLoading is now FALSE'); // ADD THIS LINE
  }
}