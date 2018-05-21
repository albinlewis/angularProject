import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';


@Injectable()
export class ApiService {

  public static API_URL: string = "http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) { }

  get(serviceUrl: string):Observable<any>{
    return this.httpClient.get(ApiService.API_URL + serviceUrl)
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  post(serviceUrl: string, data:any):Observable<any>{
    return this.httpClient.post(ApiService.API_URL + serviceUrl, data)
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  patch(serviceUrl: string, data:any):Observable<any>{
    return this.httpClient.patch(ApiService.API_URL + serviceUrl, data)
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  delete(serviceUrl: string):Observable<any>{
    return this.httpClient.delete(ApiService.API_URL + serviceUrl)
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }
  
  private handleUnauthorizedError(err){
    if(err.status === 401){
      console.log("Logout");
      // Logout
      return Observable.empty();
    }
    return Observable.throw(err);
  }

}
