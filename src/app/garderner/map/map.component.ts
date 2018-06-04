import {Component, OnInit} from '@angular/core';
import {} from '@types/googlemaps';
import {MapService} from '../../services/map.service';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    title = 'My first AGM project';
    lat: number;
    lng: number;
    zoom = 10;

    constructor( private mapservice: MapService) {
    }

    ngOnInit() {

    }

    test() {
        console.log(this.lat);
    }
}
