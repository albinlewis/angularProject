import {Injectable} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import { IGardener } from '../model/IGardener';
import { GardenerService } from './gardener.service';

@Injectable()
export class MapService {
    
    lat: number = 49.870221;
    lng: number =  8.664873;
    data: IGardener[] = [];

    destinat: any[] = [];

    constructor(
            private  mapsapi: MapsAPILoader, 
            private gardenerService: GardenerService) {
    }

    /**
     * Calculates distance from current point to every gardener via google distance matrix api
     */
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
                    let i = 0;
                    for (const d of this.data) {
                        d.mapsdata = response.rows[0].elements[i];
                        i++;
                    }
                    this.sortarray();
                }else {
                    console.error("Cant load distance matrix");
                }
            });
        });

    }

    // Sort by distance
    sortarray() {
        this.data.sort(function (a, b) {
            return a.mapsdata.distance.value - b.mapsdata.distance.value;
        });
    }

    /**
     * Get all gardeners & 
     * Get user location from navigator --> then calcuate distances
     */
    getUserLocation() {

        return this.gardenerService.getAllGardeners()
            .then(gardeners => {
                for (const g of gardeners) {
                    g.mapsdata = { distance: {}, duration: {} };
                }
                this.data = gardeners;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.lat = position.coords.latitude;
                        this.lng = position.coords.longitude;
                        this.calculateDistance();
                    }, error => {
                        console.error(error);
                    });
                    
                }

            });
    }

}
