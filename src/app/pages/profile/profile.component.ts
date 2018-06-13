import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/IUser';
import { AnalysisService } from '../../services/analysis.service';
import { IJob } from '../../model/IJob';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserDataService]
})
export class ProfileComponent implements OnInit {

  user: IUser;
  history: IJob[] = [];

  update: any = {};

  constructor(private userService: UserService,
    private authService: AuthService,
    private userDataService: UserDataService,
    private aService: AnalysisService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.getHistory();
  }

  getHistory(){
    this.aService.getHistory()
      .then(history => {
        this.history = history;
      });
  }

  updateProfile(){
    if(typeof this.update.password === 'string' && this.update.password.length >= 8){
      this.userDataService.updateUser(this.update)
        .then(user => {
          this.user = user;
          this.userService.setUser(user);
          this.authService.logout();
          this.router.navigate(["/login"]);
        }).catch(err => {
          this.authService.logout();
          this.router.navigate(["/login"]);
        });
      }else{
        console.log("No valid password");
      }
  }

  deleteProfile(){
    this.userDataService.removeUser()
      .then(() => {
        this.router.navigate(["/login"]);
      }).catch(err => console.error(err));
  }
}
