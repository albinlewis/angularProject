import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../model/IUser';
import { AnalysisService } from '../services/analysis.service';
import { IJob } from '../model/IJob';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;
  history: IJob[] = [];

  constructor(private userService: UserService,
    private aService: AnalysisService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user);
    this.getHistory();
  }

  getHistory(){
    this.aService.getHistory()
      .then(history => {
        this.history = history;
      });
  }
}
