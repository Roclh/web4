import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ConfigService} from './config.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private conf: ConfigService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.conf.loggedIn){
      this.router.navigateByUrl('auth').then(()=>console.log('Navigated to auth'));
      return false;
    }
    return true;

  }
}
