import {Component, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';

@Component({
    selector: 'app-garderner',
    templateUrl: './garderner.component.html',
    styleUrls: ['./garderner.component.css']
})
export class GardernerComponent implements OnInit {


    constructor(private locationservice: LocationService) {
    }

    ngOnInit() {

    }
}
