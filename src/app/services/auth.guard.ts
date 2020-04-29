import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        console.log('AuthGuard#canActivate called');
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        return this.canActivate(route, state);
    }

    checkLogin(url: string) {
        if (this.authService.isLoggedIn) {

            const decodedToken = this.authService.decodeToken();

            if (decodedToken) {
                if (decodedToken.exp === undefined) {
                    this.router.navigate(['/log-in']);
                    return false;
                }

                // Get Current Date Time
                const date = new Date(0);

                // Convert Exp Time to UTC
                let tokenExpDate = date.setUTCSeconds(decodedToken.exp);

                if (tokenExpDate.valueOf() > new Date().valueOf()) {
                    return true;
                } else {
                    console.log('token has been expired, please log in again');
                    this.router.navigate(['/log-in']);
                    return false;
                }
            }

            return true;
        }

        this.router.navigate(['/log-in']);
        return false;
    }

}
