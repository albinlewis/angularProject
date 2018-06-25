import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IEmail } from '../model/IEmail';

/**
 * Send an email
 */

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private apiService: ApiService) { }

  sendEmail(email: IEmail){
    return this.apiService.post("email", email).toPromise();
  }
}
