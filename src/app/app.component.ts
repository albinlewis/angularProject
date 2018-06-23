import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SwPush} from '@angular/service-worker';
import {NotificationService} from './services/notification.service';
import { UserDataService } from './services/user-data.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    

    constructor(translate: TranslateService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private userDataService: UserDataService) {
        translate.setDefaultLang('en');
        translate.use('en');
        this.notificationService.subscribeToNotifications();
        
        if(this.authService.isAuthentificated()){
            this.userDataService.getUser().catch(err => console.error(err));
        }
    }
}
