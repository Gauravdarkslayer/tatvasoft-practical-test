import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "./jwt.service";

@Injectable({
    providedIn:'root'
})
export class NoAuthGuardService implements CanActivate{
    constructor(
        private router: Router,
        private jwtService: JwtService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.jwtService.getToken()){
            this.router.navigate(['/blogs']);
            return false;
        } else {
            return true;
        }
    }
}