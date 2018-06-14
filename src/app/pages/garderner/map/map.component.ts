import {Component, OnInit} from '@angular/core';
import {} from '@types/googlemaps';
import {MapService} from '../../../services/map.service';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    zoom = 11;

    constructor( public mapservice: MapService) {
    }

    ngOnInit() {}
}
