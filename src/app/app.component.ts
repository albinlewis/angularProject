import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SwPush} from '@angular/service-worker';
import {NotificationService} from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    

    constructor(translate: TranslateService,
        private notificationService: NotificationService) {
        translate.setDefaultLang('en');
        translate.use('en');
        this.notificationService.subscribeToNotifications();
    }
}
