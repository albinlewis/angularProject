import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IUser } from '../model/IUser';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DataService{

  constructor(protected apiService: ApiService,
      private userService: UserService){
      super("users", apiService, ["created_at", "modified_at"]);
  }

  getUser(): Promise<IUser> {
    return this.readSingleItem<IUser>("")
      .then(user => {
        this.userService.setUser(user);
        return user;
      });
  }

  updateUser(update: any): Promise<IUser> {
    return this.updateItem<IUser>("", update);
  }

  removeUser(user: IUser){
    return this.apiService.post(this.serviceUrl + "/delete", user).toPromise();
  }
}
