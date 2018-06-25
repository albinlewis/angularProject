import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthguardService implements CanActivate {

    constructor(private authservice: AuthService) {
    }

    // Blocks access to websites only a logged in user can see
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.authservice.isAuthentificated();
    }

}
