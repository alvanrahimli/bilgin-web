import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { catchError, concatAll, from, map, Observable } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private accountService: AccountService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Get new token if request is 401
    // auth: none   -> request bypasses interceptor
    // auth: strict -> if refresh token fails, redirect to login
    // auth is not present -> adds access token optionally

    let isStrict = request.headers.get("auth") === "strict";
    let isNone = request.headers.get("auth") === "none";
    let isOptional = !isStrict && !isNone;

    if (isNone) {
      return next.handle(request);
    }

    let tokens = this.accountService.getPersistedToken();
    if (tokens.refreshToken === "") {
      if (isStrict) {
        this.router.navigate(['/account', 'login'], {queryParams: {returnUrl: this.router.url}});
      } else {
        return next.handle(request);
      }
    }

    return from(this.accountService.getAccessToken(tokens.refreshToken)).pipe(
      map((tokenResponse) => {
        if (tokenResponse.hasError) {
          console.debug("ERROR IN INTERCEPTOR:", tokenResponse.error);
          if (isStrict) {
            this.router.navigate(["/account", "login"], {queryParams: {returnUrl: this.router.url}});
          } else {
            return next.handle(request);
          }
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
