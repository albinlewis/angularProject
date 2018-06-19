import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';

@Injectable()
export class NotificationService {

    readonly VAPID_PUBLIC_KEY = 'BNaGf2POUom9qpnI45OSE8gmzjeqdvk-4HoV7Is-3RjPeCWMtgcukwEVPp0K2xMdfmSrGCS2be5rFIYX2qRwoEc';
    subscription: PushSubscription;

    constructor(private swPush: SwPush, private router: Router) {
        addEventListener('notificationclick', (event: any) => {
            console.log("cllicked on Notification");
            if(event.notification.data.jobId){
                router.navigate(['/result', event.notification.data.jobId]);
            }else{
                console.log("Test");
            }
        });
     }

    subscribeToNotifications(){
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        }).then(sub => {
            this.subscription = sub;
            console.log(this.subscription);
            console.log(JSON.stringify(sub));
        })
        .catch(err => console.error(err));
    }

    
}
