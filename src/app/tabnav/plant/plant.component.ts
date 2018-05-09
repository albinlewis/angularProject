import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-plant',
    templateUrl: './plant.component.html',
    styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {

    allplants = [{name: 'aleoe', panelOpenState: false}, {name: 'sdsd', panelOpenState: false}, {
        name: 'qwqwqw',
        panelOpenState: false
    }];

    currentplant = {name: '', panelOpenState: false};

    myControl: FormControl = new FormControl();

    options = [
        'One',
        'Two',
        'Three'
    ];



    constructor() {
    }

    ngOnInit() {
    }

    changecurrentplant(plant) {
        plant.panelOpenState = true;
        this.currentplant = plant;
        console.log(plant);
    }

    changestatus(plant) {
        plant.panelOpenState = false;
        console.log(plant);

    }

}
