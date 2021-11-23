import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean |UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.logginStatus);
    const authStatus = this.authService.logginStatus;
    if (authStatus === true) {
      return true;
    } else {
      this.router.navigate(['notloggin']).then();
    }
  }
}
