import { Injectable } from "@angular/core";
import { HttpClient,HttpClientModule,HttpParams } from "@angular/common/http";
import { Observable,throwError } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { catchError } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment"; 

@Injectable()
export class ApiService{
    constructor(
        private http:HttpClient,
    ){ }
    private formatErrors(error:any):any {
        return new Error(error.error);
    }
    get(path:string,params: HttpParams = new HttpParams()):Observable<any>{
        return this.http.get(`${environment.api_url}${path}`,{params}).pipe(catchError(this.formatErrors));
    }
    post(path:string, body:object={}):Observable<any>{
        return this.http.post(`${environment.api_url}${path}`,body).pipe(catchError(this.formatErrors));
    }
    delete(path:string,params: HttpParams = new HttpParams()):Observable<any>{
        return this.http.delete(`${environment.api_url}${path}`,{params}).pipe(catchError(this.formatErrors));
    }
    put(path:string, body:object={}):Observable<any>{
        return this.http.put(`${environment.api_url}${path}`,body).pipe(catchError(this.formatErrors));
    }
}