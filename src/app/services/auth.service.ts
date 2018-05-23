import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
    public static API_URL: string = environment.API_HOST + '/api/';

    token = null;

    constructor(private  httpClient: HttpClient) {
    }

    register(data: any): Observable<any> {
        return this.httpClient.post(AuthService.API_URL + 'register', data);


    }

    login(data: any): Observable<any> {
        return this.httpClient.post(AuthService.API_URL + 'login', data);
    }

    getToken() {
        return this.token;
    }
    isAuthentificated() {
      return this.token != null;
    }

    logout(){
        this.token = null;
    }

}
