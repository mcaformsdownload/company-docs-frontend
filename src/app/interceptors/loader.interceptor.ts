// frontend/src/app/interceptors/loader.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('LoaderInterceptor: Intercepting request:', req.url); // ADD THIS LINE
    this.loader.show();

    return next.handle(req).pipe(
      finalize(() => {
        console.log('LoaderInterceptor: Request finished for', req.url); // ADD THIS LINE
        this.loader.hide();
      })
    );
  }
}