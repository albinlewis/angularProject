import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-plant-details',
    templateUrl: './plant-details.component.html',
    styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

    @Input() currentplant;

    constructor() {
    }

    ngOnInit() {
    }

}
