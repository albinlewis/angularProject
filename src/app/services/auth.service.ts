import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from './user.service';


@Injectable()
export class AuthService {
    public static API_URL: string = environment.API_HOST + '/api/';

    token: string = null;
    isLoggedIn: boolean = false;

    constructor(private httpClient: HttpClient,
                private userService: UserService) {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.isLoggedIn = true;
        }
    }

    authHeader() {
        let headers = new HttpHeaders();
        if (this.token) headers = headers.append('Authorization', 'Bearer ' + this.token);
        return headers;
    }

    register(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(AuthService.API_URL + 'register', data)
                .subscribe(
                    (response: any) => {
                        if (!response.success) reject(response.error);
                        else resolve(response.message);
                    },
                    (err: any) => reject(err)
                )
        });
    }

    login(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpClient.post(AuthService.API_URL + 'login', data)
                .subscribe(
                    (response: any) => {
                        if (!response.success || !response.token) reject(response.error);
                        else {
                            this.userService.setUser(response.data);
                            this.isLoggedIn = true;
                            this.setToken(response.token);
                            resolve();
                        }
                    },
                    (err: any) => reject(err)
                )
        });
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return this.token;
    }

    isAuthentificated() {
        if (this.getToken()) return true;
        return false;
    }

    logout() {
        this.userService.unsetUser();
        this.token = null;
        localStorage.removeItem('token');
    }

}
