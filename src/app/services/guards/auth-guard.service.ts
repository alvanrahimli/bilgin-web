import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //! TODO: Refactor this: Do not trust refresh_token only!
    let refreshToken = localStorage.getItem("refresh_token");
    if (!(refreshToken === null || refreshToken === "")) {
      return true;
    } else {
      this.router.navigate(["/account", "login"], {queryParams: {
        returnUrl: state.url,
      }});
      return false;
    }
  }
}
