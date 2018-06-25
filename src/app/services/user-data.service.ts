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
  /**
   * Get all user informations
   */
  getUser(): Promise<IUser> {
    return this.readSingleItem<IUser>("")
      .then(user => {
        this.userService.setUser(user);
        return user;
      });
  }

  /**
   * Updates the user
   * @param update 
   */
  updateUser(update: any): Promise<IUser> {
    return this.updateItem<IUser>("", update);
  }

  /**
   * Remove a user
   * @param user 
   */
  removeUser(user: IUser){
    return this.apiService.post(this.serviceUrl + "/delete", user).toPromise();
  }
}
