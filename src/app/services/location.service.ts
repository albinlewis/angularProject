import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {


    constructor() {

    }

    getData() {

    }


    getDistanceBetweenPoints(end) {
        const currentlocation = {
            lat: 49.870221,
            lng: 8.664873
        };


        const earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        const R = earthRadius['kilometer'];
        const lat1 = currentlocation.lat;
        const lon1 = currentlocation.lng;
        const lat2 = end.lat;
        const lon2 = end.lng;

        const dLat = this.toRad((lat2 - lat1));
        const dLon = this.toRad((lon2 - lon1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;

    }

    toRad(x) {
        return x * Math.PI / 180;
    }


}
