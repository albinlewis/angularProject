import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/IUser';
import { AnalysisService } from '../../services/analysis.service';
import { IJob } from '../../model/IJob';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserDataService]
})
export class ProfileComponent implements OnInit {

  errorMessage: string;
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
          this.errorMessage = null;
          this.userService.setUser(user);
          this.authService.logout();
          this.router.navigate(["/login"], {queryParams: {logout: true, reason: 'update'}});
        }).catch(err => {
          this.errorMessage = err.error.message || 'PROFILE.UPDATE_FAILED';
        });
      }else{
        this.errorMessage = "AUTH.NO_VALID_PASSWORD";
      }
  }

  deleteProfile(){
    if(typeof this.update.password === 'string' && this.update.password.length >= 8){
      this.userDataService.removeUser(this.update)
        .then(()=>{
          this.errorMessage = null;
          this.authService.logout();
          this.router.navigate(["/login"], {queryParams: {logout: true, reason: 'delete'}});
        }).catch(err => {
          this.errorMessage = err.error.message || 'PROFILE.DELETE_FAILED';
        });
    }else{
      this.errorMessage = "AUTH.NO_VALID_PASSWORD";
    }
  }
}
