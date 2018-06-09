import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { ApiService } from './api.service';
import { IGardener } from '../model/IGardener';

@Injectable()
export class MapService {
    public static API_URL: string = environment.API_HOST + '/api/';

    lat: number = 49.870221;
    lng: number =  8.664873;
    data: IGardener[] = [];

    destinat: any[] = [];

    constructor(
            private  mapsapi: MapsAPILoader, 
            private apiService: ApiService) {
    }

    setCurrentLocation(){

    }

    calculateDistance() {

        this.mapsapi.load().then(() => {
            for (const dest of this.data) {
                this.destinat.push(new google.maps.LatLng(dest.latitude, dest.longitude));
            }
            const origin1 = new google.maps.LatLng(this.lat, this.lng);
            const service = new google.maps.DistanceMatrixService().getDistanceMatrix({
                origins: [origin1],
                destinations: this.destinat,
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => {
                if (status = google.maps.DistanceMatrixStatus.OK) {
                    console.log(response);
                    let i = 0;
                    for (const d of this.data) {

                        d.mapsdata = response.rows[0].elements[i];
                        i++;
                    }
                    this.sortarray();

                }
            });
        });

    }

    sortarray() {

        this.data.sort(function (a, b) {
            return a.mapsdata.distance.value - b.mapsdata.distance.value;
        });
        console.log(this.data);
    }

    getUserLocation() {

        return this.apiService.get('/gardeners').toPromise()
            .then((response: any) => {
                for (const r of response.data) {
                    r.mapsdata = { distance: {}, duration: {} };
                }
                this.data = response.data;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.lat = position.coords.latitude;
                        this.lng = position.coords.longitude;
                    }, error => {
                        console.error(error);
                    });
                    this.calculateDistance();
                }

            }).catch(err => console.log(err));
    }

}
