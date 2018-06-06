import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';

import {LocationService} from './location.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MapService {
    public static API_URL: string = environment.API_HOST + '/api/';

    lat: number;
    lng: number;
    data: any = [{
        email: '',
        latitude: 0,
        longitude: 0,
        name: '',
        phone: '',
        id: '',
        mapsdata: {distance: {}, duration: {}}
    }];

    /*data: any = [{
        name: 'L-One', lat: 49.818612, lng: 8.623809, mapsdata: {distance: {}, duration: {}}
    }, {
        name: 'Incloud',
        lat: 49.877670,
        lng: 8.639382,
        mapsdata: {distance: {}, duration: {}}
    },
        {
            name: 'Post',
            lat: 49.869175,
            lng: 8.668810,
            mapsdata: {distance: {}, duration: {}}

        }

    ];*/
    destinat: any[] = [];

    constructor(private locationservice: LocationService, private  mapsapi: MapsAPILoader, private httpClient: HttpClient) {

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
        this.httpClient.get(MapService.API_URL + '/gardener')
            .subscribe((response: any) => {
                console.log(response);
                for (const r of response.data) {
                    r.mapsdata = {distance: {}, duration: {}};
                }
                this.data = response.data;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.lat = position.coords.latitude;
                        this.lng = position.coords.longitude;
                        this.calculateDistance();
                        console.log(this.lat);

                    });
                }

            });


    }

}
