import {Component, OnInit} from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
    selector: 'app-garderner',
    templateUrl: './garderner.component.html',
    styleUrls: ['./garderner.component.css']
})
export class GardernerComponent implements OnInit {


    constructor(private mapservice: MapService) {
    }

    ngOnInit() {
        this.mapservice.getUserLocation();
    }
}
