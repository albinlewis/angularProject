import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import { IPlant } from '../model/IPlant';
import { PlantService } from '../services/plant.service';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css'],
    providers: [ PlantService ]
})
export class PlantsComponent implements OnInit {

    filterValue = '';
    plants: IPlant[] = [];

    constructor(private plantService: PlantService) {}

    ngOnInit() {
        this.getPlants();
    }

    getPlants(){
        this.plantService.getAllPlants()
            .then(plants => this.plants = plants);
    }
}
