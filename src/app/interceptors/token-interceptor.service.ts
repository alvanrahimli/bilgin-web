import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { catchError, concatAll, from, map, Observable } from 'rxjs';
import { AccountService } from '../services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private accountService: AccountService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Get new token if request is 401
    // TODO: Add [Optional, Strict] values to Skip header

    if (request.headers.has("skip")) {
      return next.handle(request);
    }

    let refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      this.router.navigate(['/account', 'login'], {queryParams: {returnUrl: this.router.url}});
    }

    return from(this.accountService.getAccessToken(refreshToken!)).pipe(
      map((tokenResponse) => {
        if (tokenResponse.hasError) {
          console.error("ERROR IN INTERCEPTOR:", tokenResponse.error);
          this.router.navigate(["/account", "login"]);
        }
    
        this.accountService.persistToken(tokenResponse.data);

        let newHeaders = request.headers.append("Authorization", `Bearer ${tokenResponse.data.accessToken}`);
        const authRequest = request.clone({headers: newHeaders});
        return next.handle(authRequest);
      }),
      concatAll(),
    );
  }
}
