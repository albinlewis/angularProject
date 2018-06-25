import { Injectable } from '@angular/core';
import { IUser } from '../model/IUser';

/**
 * Stores and manages the local user instance
 */
@Injectable()
export class UserService {

  user: IUser = null;

  constructor() {
    let user = localStorage.getItem('user');
    if(user) this.setUser(JSON.parse(user));
  }

  setUser(user: IUser){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  getUser(): IUser{
    return this.user;
  }

  unsetUser(){
    this.user = null;
    localStorage.removeItem('user');
  }

}
