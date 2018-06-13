import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SwPush} from '@angular/service-worker';
import {NotificationService} from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    readonly VAPID_PUBLIC_KEY = 'BNaGf2POUom9qpnI45OSE8gmzjeqdvk-4HoV7Is-3RjPeCWMtgcukwEVPp0K2xMdfmSrGCS2be5rFIYX2qRwoEc';

    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
        // this.subscribeToNotifications();
    }


    subscribeToNotifications() {

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
            .then(sub => {
                this.notificationservice.addPushSubscriber(sub).subscribe();
                console.log(sub);
            })
            .catch(err => console.error('Could not subscribe to notifications', err));
    }

}
