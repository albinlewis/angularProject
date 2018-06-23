import {Injectable} from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable()
export class NotificationService {

    readonly VAPID_PUBLIC_KEY = environment.PUBLIC_VAPID_KEY;
    subscription: PushSubscription;

    constructor(private swPush: SwPush, private router: Router) { }

    subscribeToNotifications(){
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        }).then(sub => {
            this.subscription = sub;
        })
        .catch(err => console.error(err));
    }
}
