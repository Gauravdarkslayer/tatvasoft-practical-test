import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "./jwt.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuardService implements CanActivate{
    constructor(
        private router: Router,
        private jwtService: JwtService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.jwtService.getToken()){
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}