import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
    public static API_URL: string = environment.API_HOST + '/api/register';

    constructor(private  httpClient: HttpClient) {
    }

    register(data: any): Observable<any> {
        return this.httpClient.post(AuthService.API_URL, data);



    }

}
