import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable()
export class ApiService {

  public static API_URL: string = environment.API_HOST + "/api/";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  get(serviceUrl: string):Observable<any>{
    return this.httpClient.get(ApiService.API_URL + serviceUrl, {headers: this.authService.authHeader()})
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  post(serviceUrl: string, data:any):Observable<any>{
    return this.httpClient.post(ApiService.API_URL + serviceUrl, data, {headers: this.authService.authHeader()})
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  patch(serviceUrl: string, data:any):Observable<any>{
    return this.httpClient.patch(ApiService.API_URL + serviceUrl, data, {headers: this.authService.authHeader()})
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }

  delete(serviceUrl: string):Observable<any>{
    return this.httpClient.delete(ApiService.API_URL + serviceUrl, {headers: this.authService.authHeader()})
      .pipe(
        catchError(this.handleUnauthorizedError)
      );
  }
  
  private handleUnauthorizedError(err){
    if(err.status === 401){
      this.authService.logout();
      return Observable.empty();
    }
    return Observable.throw(err);
  }

}
