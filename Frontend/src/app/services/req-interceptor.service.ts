import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('access-token');

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          authorization: token,
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }

  constructor() {}
}
