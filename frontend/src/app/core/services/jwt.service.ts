import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class JwtService{
    constructor() {}
    
    
    getToken() : string {
        return window.localStorage['jwtToken'] ;
    }
    getUserData(): void{
        return jwt_decode(window.localStorage["jwtToken"]);
    }
    saveToken(token:String):void{
        window.localStorage['jwtToken'] = token;
    }
    destroyToken():void{
        window.localStorage.removeItem('jwtToken');
    }
    
}