import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { map } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor( private apiService:ApiService) {}

    login(data:any):Observable<any>{
        return this.apiService.post('/api/v1/login',data).pipe(
            map(res =>{return res})
        )
    }
    signup(data:any):Observable<any>{
        return this.apiService.post('/api/v1/signup',data).pipe(
            map(res =>{return res})
        );
    }
}