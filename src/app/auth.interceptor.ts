import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  omitCalls = ['login', 'register'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request:", req);

    let skipInterceptor = false;
    //console.log("---------------HttpInterceptorService-------------------")
    //console.log("req.url:", req.url)
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        skipInterceptor = true;
      }
    });
    console.log("skipInterceptor:", skipInterceptor)
    let token = this.authService.getAuthToken();
    console.log("token:", token)
    if (token && !skipInterceptor) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(tokenizedReq).pipe(tap({
        next: (event) => console.log('succeeded. event:', event),
        error: (err: any) => {
          console.log("Error:", err);
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 && err.status !== 403) {
              return;
            }
            console.log("Logout and redirect to login page")
            this.router.navigate(['/login']);
          }
        }
      }));
    } else {
      return next.handle(req);
    }
  }
}
