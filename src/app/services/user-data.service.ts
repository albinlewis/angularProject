import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IUser } from '../model/IUser';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DataService{

  constructor(protected apiService: ApiService){
      super("users", apiService, ["created_at", "modified_at"]);
  }

  getUser(): Promise<IUser> {
    return this.readSingleItem<IUser>("");
  }

  updateUser(update: any): Promise<IUser> {
    return this.updateItem<IUser>("", update);
  }

  removeUser(){
    return this.removeItem<void>("");
  }
}