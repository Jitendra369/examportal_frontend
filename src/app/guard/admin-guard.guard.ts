import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuardGuard implements CanActivate {
// if user is logged & it role is admin the user can acess the admin/user account/page resp.
// to get the user-details we have user loginService -service
  constructor(private loginSevice : LoginServiceService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.loginSevice.isUserLoggedIn() && this.loginSevice.getUserRole()=='ADMIN') {
        // let x = this.loginSevice.isUserLoggedIn();
        // let y = this.loginSevice.getUserRole()=='ADMIN';

        return true;
      }
      
      // navigate to login page 
      this.router.navigate(['login']);

    return false;
  }
  
}
