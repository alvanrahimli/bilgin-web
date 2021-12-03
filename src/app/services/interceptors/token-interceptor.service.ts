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

    if (request.headers.get("auth") === "none") {
      return next.handle(request);
    }

    let tokens = this.accountService.getPersistedToken();
    if (tokens.refreshToken === "") {
      this.router.navigate(['/account', 'login'], {queryParams: {returnUrl: this.router.url}});
    }

    return from(this.accountService.getAccessToken(tokens.refreshToken)).pipe(
      map((tokenResponse) => {
        if (tokenResponse.hasError) {
          console.debug("ERROR IN INTERCEPTOR:", tokenResponse.error);
          if (request.headers.get("auth") === "strict") {
            this.router.navigate(["/account", "login"]);
          }
        }

        if (tokenResponse.hasError) {
          return next.handle(request);
        } else {
          this.accountService.persistToken(tokenResponse.data);
          let newHeaders = request.headers.append("Authorization", `Bearer ${tokenResponse.data.accessToken}`);
          const authRequest = request.clone({headers: newHeaders});
          return next.handle(authRequest);
        }
      }),
      concatAll(),
    );
  }
}
