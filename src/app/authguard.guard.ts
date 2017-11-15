import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor (
  	private _route: ActivatedRoute,
	  private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
        return true;
    }
    this._router.navigate(['/login'], {queryParams: { returnUrl: state.url }});
    return false;
  }
}
