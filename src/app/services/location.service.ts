import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {


    constructor() { }

    getDistanceBetweenPoints(current:any, end:any) {
        const earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        const R = earthRadius['miles'];
        const lat1 = current.lat;
        const lon1 = current.lng;
        const lat2 = end.lat;
        const lon2 = end.lng;

        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        d = d * (1.60934);
        d = Math.round(d * 10) / 10;


        return d;
    }

    toRad(x) {
        return x * Math.PI / 180;
    }


}
